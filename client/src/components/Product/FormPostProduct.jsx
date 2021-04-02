import React, { useState, useEffect } from "react";
import { selectCreateProductForm } from "../../redux/seller/seller.selectors";
import { saveProductForm } from "../../redux/seller/seller.actions";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Wrapper, ImagesContainer } from "./styles/FormPostProduct.styles";
import { FaChevronDown } from "react-icons/fa";
import { RiImageAddLine } from "react-icons/ri";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Editor from "../Editor/Editor";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs"
import LazyLoad from "react-lazyload";
import Button from "@material-ui/core/Button"
import { createNewProduct, fetchPortfolios, fetchCategoriesByPortfolio, fetchProductGroupsByCategory } from "../../utils/connectDB";
import {
  Form,
  FormInline,
  FormGroup,
  Label,
  Input,
  Required,
  Select,
  Option,
  ListAPI,
  ItemAPI,
  Placeholder,
  SelectIcon,
  Editable,
  ImageInput,
  CustomNumberFormat,
  FormGroupAnimation,
  PlainText,
} from "../Custom/styles/CustomFormSeller.styles";
import useLanguage from "../Global/useLanguage"

import FormComplete from "./FormComplete"
import { generateBase64Image } from "../../utils/image";
const FormPostProduct = ({ product, saveProductForm }) => {
  const {
    selectedPortfolio,
    selectedCategory, 
    selectedProductGroup,    
    name,
    origin,
    manufactor,
    image,
    price,
    isDiscount,
    discount,
    discountExpDate,
    description,
    information,
    weight,
    quantity,
    ship_fee,
  } = product;
  const [loading, setLoading] = useState(true);
  const [listPortfolios, setListPortfolios] = useState([]);
  const [showListPortfolios, setShowListPortfolios] = useState(false);
  const [listCategories, setListCategories] = useState([]);
  const [showListCategories, setShowListCategories] = useState(false); 
  const [listProductGroups, setListProductGroups] = useState([]);
  const [showListProductGroups, setShowListProductGroups] = useState(false);
  const [hasShippingFee, setHasShippingFee] = useState(false);
  const [informationState, setInformationState] = useState(
    EditorState.createEmpty()
  );
  const [descriptionState, setDescriptionState] = useState(
    EditorState.createEmpty()
  );  
  const [listBase64Image, setListBase64Image] = useState([]);
  const [validForm, setValidForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(null);
  const {i18n, lang} = useLanguage();
  const {postProduct} = i18n.store.data[lang].translation;
  useEffect(() => {
    let _isMounted = true;
    fetchPortfolios()
      .then((data) => {
        if (_isMounted) {        
          setListPortfolios([...data.portfolios]);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (_isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => (_isMounted = false);
  }, []);

  const handleChangePortfolio = (portfolio) => {
    console.log(portfolio)
    saveProductForm({
      selectedPortfolio : {...portfolio},
      selectedCategory : null , 
      selectedProductGroup : null
    });
    fetchCategoriesByPortfolio(portfolio._id)
      .then((data) => {
        if (data) {          
          setListCategories([...data.categories]);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  const handleChangeCategory = (category) => {
    saveProductForm({
      selectedCategory: { ...category },
      selectedProductGroup: null,
    });
    fetchProductGroupsByCategory(category._id)
      .then((data) => {
        if (data) {                 
          setListProductGroups([...data.productGroups]);
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleChangeproductGroup = (productGroup) => {
    saveProductForm({
      selectedProductGroup: {...productGroup},
    });
  };
  const onChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "quantity" || name === "weight" || name === "discount") {
      if (value < 0) {
        return saveProductForm({ [name]: 0 });
      }
      return saveProductForm({[name] : +value})
    }
    return saveProductForm({ [name]: value });
  };

  const setProductInformationState = (editorState) => {
    setInformationState(editorState);
    const productInformationHTML = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );   
    saveProductForm({ information: productInformationHTML });
  };
  
  const convertHTMLToEditorState = (html) => {
    const contentBlock  = htmlToDraft(html)
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    return editorState.getCurrentContent()
  }

  const setProductDescriptionState = (editorState) => {
    setDescriptionState(editorState);
    const productDescriptionHTML = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    saveProductForm({ description: productDescriptionHTML });
  };

  const handleChangeImage = async (e) => {
    const length = e.target.files.length;
    let listImage = [];
    for (let i = 0; i < length; i++) {
      listImage.push(e.target.files[i]);
    }
    saveProductForm({ image: [...listImage] });
    const imageBase64Promise = listImage.map(async (file) => {
      return await generateBase64Image(file);
    });
    const listImageBase64 = await Promise.all(imageBase64Promise);
    setListBase64Image(listImageBase64);
  };

  const isValidForm = () => {
    const checkDescription = convertHTMLToEditorState(description);
    const checkInformation = convertHTMLToEditorState(information);    
    if (
      !selectedCategory||      
      !selectedPortfolio ||      
      !name.trim() ||      
      !image.length ||
      image.length > 5 ||
      !price ||
      ship_fee > price  ||
      weight === 0 ||
      quantity === 0 ||
      price === 0 ||
      (isDiscount &&
        (!discount ||
          typeof discount !== "number" ||
          discount < 0 ||
          discount > 100 ||          
          !discountExpDate)) ||
      !checkDescription.hasText() ||
      !checkInformation.hasText() ||
      !manufactor ||
      !origin
    ) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (!isValidForm()) {   
      return setValidForm(false);
    }    
    setValidForm(true);
  }, [
    selectedPortfolio,
    selectedCategory,
    selectedProductGroup,
    name,    
    isDiscount,
    discount,
    discountExpDate,
    description,
    information,
    manufactor,
    price,
    image,
    weight,
    quantity,
    ship_fee,
    origin
  ]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!isValidForm()) {
      return setError(
        "Bạn cần phải điền đầy đủ thông tin sản phẩm trước khi gửi!!"
      );
    }    
    createNewProduct(product)
      .then((res) => {
        setSuccess(true);
        setComplete(true);
      })
      .catch((err) => {       
        setError(error.message);
        setLoading(false);
      })      
  };
  if (complete) {
    return <FormComplete success={success}/>;
  }
  if (loading) return <div>Loading...</div>;
  return (
    <Wrapper>
      <h2>{postProduct.title}</h2>
      {/* Select category */}
      <FormGroup
        style={{ zIndex: showListPortfolios ? 10 : 1 }}
        onClick={() =>
          listPortfolios.length &&
          setShowListPortfolios((prevState) => !prevState)
        }
      >
        <Label>{postProduct.portfolio}</Label>
        <Select>
          {selectedPortfolio ? (
            <span>{selectedPortfolio.name}</span>
          ) : (
            <Placeholder>{postProduct.portfolioPlaceholder}</Placeholder>
          )}
          <SelectIcon>
            <FaChevronDown />
          </SelectIcon>

          <ListAPI show={showListPortfolios}>
            {listPortfolios.map((portfolio) => (
              <ItemAPI
                key={portfolio._id}
                onClick={() =>
                  handleChangePortfolio(portfolio)
                }
              >
                {portfolio.name}
              </ItemAPI>
            ))}
          </ListAPI>
        </Select>
      </FormGroup>
      {/* Categories */}
      <FormGroup
        style={{
          zIndex: selectedPortfolio && showListCategories ? 11 : 1,
        }}
        onClick={() => {
          if (selectedPortfolio) {
            setShowListCategories((prevState) => !prevState);
          }
        }}
      >
        <Label>{postProduct.category}</Label>
        <Select>
          {selectedCategory ? (
            <span>{selectedCategory.name}</span>
          ) : listCategories.length ? (
            <Placeholder>{postProduct.categoryPlaceholder}</Placeholder>
          ) : (
            <Placeholder>{postProduct.noCategory}</Placeholder>
          )}
          <SelectIcon>
            <FaChevronDown />
          </SelectIcon>

          <ListAPI show={showListCategories && selectedPortfolio}>
            {listCategories.map((category) => (
              <ItemAPI
                key={category._id}
                onClick={() =>
                  handleChangeCategory(category)
                }
              >
                {category.name}
              </ItemAPI>
            ))}
          </ListAPI>
        </Select>
      </FormGroup>
      {/* Product Groups */}
      <FormGroup
        style={{
          zIndex:
            selectedPortfolio &&
            selectedCategory &&            
            listProductGroups.length &&
            showListProductGroups
              ? 12
              : 1,
        }}
        onClick={() => {
          if (
            selectedPortfolio&&
            selectedCategory&&            
            listProductGroups.length
          ) {
            setShowListProductGroups((prevState) => !prevState);
          }
        }}
      >
        <Label>{postProduct.productGroup}</Label>
        <Select>
          {selectedProductGroup ? (
            <span>{selectedProductGroup.name}</span>
          ) : listProductGroups.length ? (
            <Placeholder>{postProduct.productGroupPlaceholder}</Placeholder>
          ) : (
            <Placeholder>{postProduct.noProductGroup}</Placeholder>
          )}
          <SelectIcon>
            <FaChevronDown />
          </SelectIcon>
          <ListAPI
            show={
              selectedPortfolio &&
              selectedCategory &&              
              showListProductGroups
            }
          >
            {listProductGroups.map((productGroup) => (
              <ItemAPI
                key={productGroup._id}
                onClick={() =>
                  handleChangeproductGroup(productGroup)
                }
              >
                {productGroup.name}
              </ItemAPI>
            ))}
          </ListAPI>
        </Select>
      </FormGroup>     
      {/* Product Name */}
      <FormGroup>
        <Label>{postProduct.productName}</Label>
        <Input
          type="text"
          name="name"          
          value={name}
          onChange={onChangeInput}
          required
        />
      </FormGroup>
      {/* Manufactor */}
      <FormGroup>
        <Label>{postProduct.manufactor}</Label>
        <Input
          type="text"
          name="manufactor"         
          value={manufactor}
          onChange={onChangeInput}
          required
        />
      </FormGroup>
      {/* Origin */}
      <FormGroup>
        <Label>{postProduct.origin}</Label>
        <Input
          type="text"
          name="origin"          
          value={origin}
          onChange={onChangeInput}
          required
        />
      </FormGroup>
      {/* Image */}
      <FormGroup>
        <ImageInput htmlFor="images">
          <RiImageAddLine />
          <input
            type="file"
            name="images"
            id="images"
            multiple={true}
            onChange={handleChangeImage}
          />
        </ImageInput>
        {listBase64Image.length ? (
          <ImagesContainer>
            {listBase64Image.map((image, idx) => (
              <LazyLoad key={`image-${idx}`}>
                <img src={image} />
              </LazyLoad>
            ))}
          </ImagesContainer>
        ) : null}
      </FormGroup>
      {/* Price */}
      <FormGroup>
        <Label>{postProduct.price}</Label>
        <CustomNumberFormat
          value={price}
          allowLeadingZeros={false}
          thousandSeparator={true}
          suffix={price ? " VNĐ" : ""}
          allowNegative={false}
          allowEmptyFormatting={true}
          onValueChange={({ floatValue }) => {
            saveProductForm({ price: floatValue });
          }}
          style={{ borderBottomColor: !price ? "red" : "green" }}
        />
      </FormGroup>
      {/* quantity, weight */}
      <FormInline>
        <FormGroup>
          <Label>{postProduct.quantity}</Label>
          <Input
            type="number"
            value={quantity == 0 ? "" : quantity}
            name="quantity"
            min={1}
            onChange={onChangeInput}
          />
        </FormGroup>
        <FormGroup>
          <Label>{postProduct.weight}</Label>
          <Input
            type="number"
            value={weight == 0 ? "" : weight}
            name="weight"
            onChange={onChangeInput}
          />
        </FormGroup>
      </FormInline>
      {/* shipping fee */}
      <FormInline>
        <FormGroup style={{ width: "auto" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={hasShippingFee}
                onChange={(e) => {
                  if (hasShippingFee) {
                    saveProductForm({ ship_fee: 0 });
                  }else{
                    saveProductForm({ship_fee : 12000})
                  }
                  setHasShippingFee((prevState) => !prevState);
                }}
                name="fee-ship"
                color="primary"
              />
            }
            label="Shipping Fee"
          />
        </FormGroup>
        <FormGroup style={{ flex: 1 }}>
          <FormGroupAnimation show={hasShippingFee}>
            <Label>
              <Required>{postProduct.shippingFee}</Required>
            </Label>
            <CustomNumberFormat
              value={ship_fee}
              allowLeadingZeros={false}
              thousandSeparator={true}
              suffix={ship_fee ? " VNĐ" : ""}
              allowNegative={false}
              allowEmptyFormatting={true}
              onValueChange={({ floatValue }) => {                
                saveProductForm({ ship_fee: floatValue });
              }}
              style={{ borderBottomColor: !price ? "red" : "green" }}
            />
          </FormGroupAnimation>
        </FormGroup>
      </FormInline>
      {/* discount product */}
      <FormInline>
        <FormGroup style={{ width: "auto" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isDiscount}
                onChange={(e) => {
                  saveProductForm({ isDiscount: e.target.checked });
                  if (discount || discountExpDate) {
                    saveProductForm({ discount: null, discountExpDate: null });
                  }
                }}
                name={postProduct.discount}
                color="primary"
              />
            }
            label={postProduct.discount}
          />
        </FormGroup>
        <FormGroup style={{ flex: 1 }}>
          <FormGroupAnimation show={isDiscount}>
            <Label>
              <Required>{postProduct.discountPercentage}</Required>
            </Label>
            <Input
              type="number"
              placeholder="%"
              name="discount"
              onChange={onChangeInput}
            />
          </FormGroupAnimation>
        </FormGroup>
        <FormGroup style={{ flex: 1, marginLeft: "1rem" }}>
          <FormGroupAnimation show={isDiscount}>
            <Label>
              <Required>{postProduct.discountExpiration}</Required>
            </Label>
            <Input
              value={discountExpDate || ""}
              type="date"
              name="discountExpDate"
              onChange={onChangeInput}
              style={{
                borderBottomColor: !discountExpDate ? "red" : "green",
              }}
            />            
          </FormGroupAnimation>
        </FormGroup>
      </FormInline>
      <FormGroup>
        <FormGroupAnimation show={discount > 0}>
          <Label>
            <Required>{postProduct.priceAfterDiscount}</Required>
          </Label>
          <CustomNumberFormat
            thousandSeparator={true}
            thousandsGroupStyle="VND"
            suffix={" Đ"}
            value={(price * (100 - discount)) / 100}
            disabled
          />
        </FormGroupAnimation>
      </FormGroup>
      <div style={{ margin: "1.5rem 0 " }}>
        <h4>{postProduct.productInformation}</h4>
        <Editor
          editorState={informationState}
          setEditorState={setProductInformationState}
        />
      </div>
      <div style={{ margin: "1.5rem 0 " }}>
        <h4>{postProduct.productDescription}</h4>
        <Editor
          editorState={descriptionState}
          setEditorState={setProductDescriptionState}
        />
      </div>
      
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ display: "block", margin: "auto" }}
          disabled={!validForm}
          onClick={handleSubmitForm}
        >
          {postProduct.submit}
        </Button>
      
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  product: selectCreateProductForm,
});

const mapDispathToProps = (dispatch) => ({
  saveProductForm: (obj) => dispatch(saveProductForm(obj)),
});

export default connect(mapStateToProps, mapDispathToProps)(FormPostProduct);
