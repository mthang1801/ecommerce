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
import { createNewProduct } from "../../utils/connectDB";
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

import {
  getListCategory,
  getListProductType,
  getListProductGroup,
} from "../../utils/connectDB";
import FormComplete from "./FormComplete"
import { generateBase64Image } from "../../utils/image";
const FormPostProduct = ({ product, saveProductForm }) => {
  const {
    selectedCategory,
    selectedProductType,
    selectedProductGroup,
    label,
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
  const [listCategories, setListCategories] = useState([]);
  const [showListCategories, setShowListCategories] = useState(false);
  const [listProductTypes, setListProductTypes] = useState([]);
  const [showListProductTypes, setShowListProductTypes] = useState(false);
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
  useEffect(() => {
    let _isMounted = true;
    getListCategory()
      .then((data) => {
        if (_isMounted) {
          setListCategories([...data]);
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

  const handleChangeCategory = (categoryId, categoryName, categoryLinkUrl) => {
    saveProductForm({
      selectedCategory: { _id: categoryId, name: categoryName, linkUrl : categoryLinkUrl },
      selectedProductType: { _id: "", name: "", linkUrl : "" },
      selectedProductGroup: { _id: "", name: "", linkUrl : "" },
    });
    getListProductType(categoryId)
      .then((data) => {
        if (data) {
          setListProductTypes([...data]);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  const handleChangeproductType = (productTypeId, productTypeName, productTypeLinkUrl) => {
    saveProductForm({
      selectedProductType: { _id: productTypeId, name: productTypeName, linkUrl : productTypeLinkUrl },
      selectedProductGroup: { _id: "", name: "", linkUrl : "" },
    });
    getListProductGroup(productTypeId)
      .then((data) => {
        if (data) {
          setListProductGroups([...data]);
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleChangeproductGroup = (productGroupId, productGroupName, productGroupLinkUrl) => {
    saveProductForm({
      selectedProductGroup: { _id: productGroupId, name: productGroupName, linkUrl:  productGroupLinkUrl },
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
    console.log(checkDescription.hasText());
    console.log(checkInformation.hasText());
    
    if (
      !selectedCategory.name ||
      !selectedCategory._id ||      
      !selectedCategory.linkUrl ||
      !selectedProductType.name ||
      !selectedProductType._id ||          
      !label.trim() ||
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
    selectedCategory,
    selectedProductType,
    name,
    label,
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
  ]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!isValidForm()) {
      return setError(
        "Bạn cần phải điền đầy đủ thông tin sản phẩm trước khi gửi!!"
      );
    }
    createNewProduct(product)
      .then((res) => {
        setSuccess(true);
      })
      .catch((err) => {
        setSuccess(false);
      })
      .finally(() => {
        setComplete(true);
      });
  };
  if (complete) {
    return <FormComplete success={success}/>;
  }
  if (loading) return <div>Loading...</div>;
  return (
    <Wrapper>
      <h2>Post new Product</h2>
      {/* Select category */}
      <FormGroup
        style={{ zIndex: showListCategories ? 10 : 1 }}
        onClick={() =>
          listCategories.length &&
          setShowListCategories((prevState) => !prevState)
        }
      >
        <Label>Category</Label>
        <Select>
          {selectedCategory._id ? (
            <span>{selectedCategory.name}</span>
          ) : (
            <Placeholder>Select Category</Placeholder>
          )}
          <SelectIcon>
            <FaChevronDown />
          </SelectIcon>

          <ListAPI show={showListCategories}>
            {listCategories.map((category) => (
              <ItemAPI
                key={category._id}
                onClick={() =>
                  handleChangeCategory(category._id, category.name, category.linkUrl)
                }
              >
                {category.name}
              </ItemAPI>
            ))}
          </ListAPI>
        </Select>
      </FormGroup>
      {/* Product Types */}
      <FormGroup
        style={{
          zIndex: selectedCategory._id && showListProductTypes ? 11 : 1,
        }}
        onClick={() => {
          if (selectedCategory._id) {
            setShowListProductTypes((prevState) => !prevState);
          }
        }}
      >
        <Label>Product Type</Label>
        <Select>
          {selectedProductType._id ? (
            <span>{selectedProductType.name}</span>
          ) : listProductTypes.length ? (
            <Placeholder>Select Product Type</Placeholder>
          ) : (
            <Placeholder>No Product Type</Placeholder>
          )}
          <SelectIcon>
            <FaChevronDown />
          </SelectIcon>

          <ListAPI show={showListProductTypes && selectedCategory._id}>
            {listProductTypes.map((productType) => (
              <ItemAPI
                key={productType._id}
                onClick={() =>
                  handleChangeproductType(productType._id, productType.name, productType.linkUrl)
                }
              >
                {productType.name}
              </ItemAPI>
            ))}
          </ListAPI>
        </Select>
      </FormGroup>
      {/* Product Groups */}
      <FormGroup
        style={{
          zIndex:
            selectedCategory._id &&
            selectedProductType._id &&
            listProductGroups.length &&
            showListProductGroups
              ? 12
              : 1,
        }}
        onClick={() => {
          if (
            selectedCategory._id &&
            selectedProductType._id &&
            listProductGroups.length
          ) {
            setShowListProductGroups((prevState) => !prevState);
          }
        }}
      >
        <Label>Product Groups</Label>
        <Select>
          {selectedProductGroup._id ? (
            <span>{selectedProductGroup.name}</span>
          ) : listProductGroups.length ? (
            <Placeholder>Select Product Group</Placeholder>
          ) : (
            <Placeholder>No Product Groups</Placeholder>
          )}
          <SelectIcon>
            <FaChevronDown />
          </SelectIcon>
          <ListAPI
            show={
              selectedCategory._id &&
              selectedProductType._id &&
              showListProductGroups
            }
          >
            {listProductGroups.map((productGroup) => (
              <ItemAPI
                key={productGroup._id}
                onClick={() =>
                  handleChangeproductGroup(productGroup._id, productGroup.name, productGroup.linkUrl)
                }
              >
                {productGroup.name}
              </ItemAPI>
            ))}
          </ListAPI>
        </Select>
      </FormGroup>
      {/* Label */}
      <FormGroup>
        <Label>Label</Label>
        <Input
          type="text"
          name="label"
          placeholder="Type Product Label"
          value={label}
          onChange={onChangeInput}
          required
        />
      </FormGroup>
      {/* Product Name */}
      <FormGroup>
        <Label>Product Name</Label>
        <Input
          type="text"
          name="name"
          placeholder="Type Product Name"
          value={name}
          onChange={onChangeInput}
          required
        />
      </FormGroup>
      {/* Manufactor */}
      <FormGroup>
        <Label>Manufactor</Label>
        <Input
          type="text"
          name="manufactor"
          placeholder="Type Product Label"
          value={manufactor}
          onChange={onChangeInput}
          required
        />
      </FormGroup>
      {/* Origin */}
      <FormGroup>
        <Label>Origin</Label>
        <Input
          type="text"
          name="origin"
          placeholder="Type Product Label"
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
        <Label>Price</Label>
        <CustomNumberFormat
          value={price}
          allowLeadingZeros={false}
          thousandSeparator={true}
          suffix={" VNĐ"}
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
          <Label>Số Lượng</Label>
          <Input
            type="number"
            value={quantity == 0 ? "" : quantity}
            name="quantity"
            min={1}
            onChange={onChangeInput}
          />
        </FormGroup>
        <FormGroup>
          <Label>Khối Lượng (kg)</Label>
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
              <Required>Shipping Fee</Required>
            </Label>
            <CustomNumberFormat
              value={ship_fee}
              allowLeadingZeros={false}
              thousandSeparator={true}
              suffix={" VNĐ"}
              allowNegative={false}
              allowEmptyFormatting={true}
              onValueChange={({ floatValue }) => {
                if (ship_fee > price || !price) {
                  return saveProductForm({ ship_fee: 0 });
                }
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
                name="isDiscount"
                color="primary"
              />
            }
            label="SP giảm giá"
          />
        </FormGroup>
        <FormGroup style={{ flex: 1 }}>
          <FormGroupAnimation show={isDiscount}>
            <Label>
              <Required>Discount</Required>
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
              <Required>Thời hạn</Required>
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

            <PlainText>Bắt buộc (*)</PlainText>
          </FormGroupAnimation>
        </FormGroup>
      </FormInline>
      <FormGroup>
        <FormGroupAnimation show={discount > 0}>
          <Label>
            <Required>Giá SP Được giảm giá</Required>
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
        <h4>Product Information</h4>
        <Editor
          editorState={informationState}
          setEditorState={setProductInformationState}
        />
      </div>
      <div style={{ margin: "1.5rem 0 " }}>
        <h4>Product Description</h4>
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
          Tạo Sản Phẩm
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
