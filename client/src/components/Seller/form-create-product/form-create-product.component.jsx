import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Form,
  FormInline,
  FormGroup,
  Label,
  Input,
  Required,
  Select,
  Option,
  Editable,
  FormGroupAnimation,
  PlainText
} from "../../UI/custom-form-second/custom-form-second.component";
import {
  FormCreateProductWrapper,
  CustomNumberFormat,
  List,
  DisplayImage,
  Image
} from "./form-create-product.styles";
import CustomButton from "../../UI/custom-button/custom-button.component"
import AppContext from "../../../context/app-viewport.context";
import { getListCategory, getListProductType } from "../../../utils/algorithms";
import ChipInput from "material-ui-chip-input";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {generateBase64Image} from "../../../utils/image"
import "./form-create.styles.css";
import axios from "axios";
const FormCreateProduct = () => {
  const [listCatogory, setListCategory] = useState([]);
  const [listProductType, setListProductType] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    _id: "",
    name: "",
    linkUrl: "",
  });
  const [selectedProductType, setSelectedProductType] = useState({
    _id: "",
    name: "",
    linkUrl: "",
  });
  const [name, setName] = useState("Samsung galaxy note 9");  
  const [image, setImage] = useState([]);
  const [listBase64Image, setListBase64Image] = useState([]);
  const [tags, setTags] = useState(["samsung", "smartphones"]);
  const [price, setPrice] = useState(19900000);
  const [isDiscount, setIsDiscount] = useState(false);
  const [discount, setDiscount] = useState(null);
  const [discountExpDate, setDiscountExpDate] = useState(null);
  const [description, setDescription] = useState("Samsung 2020");
  const [information, setInformation] = useState("samsung");
  const [manufactor, setManufactor] = useState("samsung electronic");
  const [categoryErr, setCategoryErr] = useState("");
  const [productTypeErr, setProductTypeErr] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [tagsErr, setTagsErr] = useState("");
  const [imageErr, setImageErr] = useState("");
  const [priceErr, setPriceErr] = useState("");
  const [discountErr, setDiscountErr] = useState("");
  const [discountExpDateErr, setdiscountExpDateErr] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");
  const [informationErr, setInformationErr] = useState("");
  const [manufactorErr, setManufactorErr] = useState("");
  const [error, setError] = useState(null);
  const [mobileView, setMobileView] = useState(window.innerWidth < 600);
  const formRef = useRef(null);
  const [tabletView, setTabletView] = useState(
    window.innerWidth < 992 && window.innerWidth >= 660
  );
  const width = useContext(AppContext);
  useEffect(() => {
    if (width < 660) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
    if (width < 992 && width >= 660) {
      setTabletView(true);
    } else {
      setTabletView(false);
    }
  }, [width]);

  useEffect(() => {
    window.scrollTo({
      top : formRef.current.offsetTop - 50,
      behavior : "smooth"
    })
  }, [])

  useEffect(() => {
    let _mounted = true;
    getListCategory()
      .then((data) => {
        if (_mounted) {
          setListCategory(data);
        }
      })
      .catch((err) => {
        if (_mounted) {
          setError(err);
        }
      });
    return () => (_mounted = false);
  }, [getListCategory]);
  const handleChangeCategory = (e) => {
    const index = e.target.selectedIndex;
    const _id = e.target.value;
    const linkUrl = e.target.childNodes[index].dataset.url;
    const name = e.target[index].text;
    setSelectedCategory({ _id, name, linkUrl });
    getListProductType(_id)
      .then((data) => {
        setListProductType(data);
      })
      .catch((err) => setError(err));
  };
  const handleChangeProductType = e => {
    const index = e.target.selectedIndex;
    const _id = e.target.value;
    const linkUrl = e.target.childNodes[index].dataset.url;
    const name = e.target[index].text;    
    setSelectedProductType({ _id, name, linkUrl });
  }  
  const handleChangeImage = async e => {    
    const length = e.target.files.length ; 
    let listImage= [];
    for(let i = 0; i < length ; i++){     
      listImage.push(e.target.files[i])
    }
    console.log(listImage)
    setImage(listImage);
    const imageBase64Promise =  listImage.map( async file => {
      return await generateBase64Image(file);      
    })
    const listImageBase64 = await Promise.all(imageBase64Promise)    
    setListBase64Image(listImageBase64)
  }
  const handleChangeChip = (chip) => {
    setTags(chip);
  };
 
  const handleOnSubmitForm = (e) => {
    e.preventDefault();        
    let isError = false ; 
    setCategoryErr("");
    setProductTypeErr("");
    setNameErr("");
    setTagsErr("");
    setPriceErr("");
    setDiscountErr("");
    setdiscountExpDateErr("");
    setDescriptionErr("");
    setInformationErr("");
    setManufactorErr("");
    if(!selectedCategory.name || !selectedCategory._id || !selectedCategory.linkUrl){      
      isError = true ;
      setCategoryErr("Vui lòng chọn nhóm SP");
    }
    if(!selectedProductType.name || !selectedProductType._id || !selectedProductType.linkUrl){      
      isError = true ;
      setProductTypeErr("Vui lòng chọn loại SP");
    }
    if(name.trim().length < 3){           
      isError = true ;
      setNameErr("Tên SP phải có ít nhất 3 ký tự");
    }    
    if(!image.length){                
      isError = true ;
      setImageErr("Bạn cần tải ít nhất 1 hình")
    }
    if(!tags.length){      
      isError = true ;
      setTagsErr("Bạn cần tạo tags để sản phẩm được tiếp cận tối ưu");
    }
    if(!price || typeof(price) !== "number"){      
      isError = true ;
      setPriceErr("Giá SP phải là số và không được để trống");
    }
    if(isDiscount){      
      if(!discount || typeof(discount) !== "number" || discount < 0 || discount > 100){        
        isError = true ;
        setDiscountErr("Giá khuyến mãi phải là số, lớn hơn 0, nhỏ hơn 100")
      }
      if(!discountExpDate){     
        isError = true ;
        setdiscountExpDateErr("Định dạng ngày tháng không đúng.");
      }
    }       
    
    if(!description){      
      isError = true ;
      setDescriptionErr("Bạn cần mô tả sản phẩm của mình");
    }
    if(!information){      
      isError = true ;
      setInformationErr("Bạn cần điền thông tin sản phẩm");
    }
    if(!manufactor){      
      isError = true ;
      setManufactorErr("Bạn cần nhập chính xác tên nhà sản xuất");
    }
    console.log(isError);
    if(isError){
      return ;
    }  
    let formData = new FormData();
    formData.append("categoryId", selectedCategory._id)    ;
    formData.append("productTypeId", selectedProductType._id);    
    formData.append("rootUrl", selectedProductType.linkUrl);
    formData.append("name", name);
    formData.append("tags", tags);
    formData.append("price", price);  
    formData.append("discount", discount||0);
    formData.append("dicountExpDate", discountExpDate);
    formData.append("description", description);
    formData.append("information", information);
    formData.append("manufactor", manufactor);
    for(let file of image){
      formData.append("multiple-images", file)
    }
            
    axios.post("/product", formData)
    .then(res => console.log(res))
  }
  return (
    <FormCreateProductWrapper>
      <Form ref={formRef} onSubmit={handleOnSubmitForm}>
        <FormGroup>
          <Select
            defaultValue={selectedCategory._id}
            onChange={handleChangeCategory}
          >
            <Option value="" disabled>
              -- Nhóm sản phẩm --
            </Option>
            {listCatogory.map((category) => (
              <Option
                key={category._id}
                value={category._id}
                data-url={category.linkUrl}
              >
                {category.name}
              </Option>
            ))}
          </Select>
          {categoryErr && <PlainText>{categoryErr}</PlainText>}
        </FormGroup>
        <FormGroup>
          <Select defaultValue={selectedProductType._id} onChange={handleChangeProductType}>
            <Option value="" disabled>
              -- Loại sản phẩm --
            </Option>
            {listProductType.map((productType) => (
              <Option
                key={productType._id}
                value={productType._id}
                data-url={productType.linkUrl}
              >
                {productType.name}
              </Option>
            ))}
          </Select>
          {productTypeErr && <PlainText>{productTypeErr}</PlainText>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="name">Tên Sản phẩm</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}            
          />
          {nameErr && <PlainText>{nameErr}</PlainText>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="manufactor">Nhà sản xuất</Label>
          <Input
            id="manufactor"
            type="text"
            value={manufactor}
            onChange={(e) => setManufactor(e.target.value)}
          />
          {manufactorErr && <PlainText>{manufactorErr}</PlainText>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="image">Tải hình ảnh</Label>
          <Input
            id="image"
            type="file"            
            onChange={handleChangeImage}
            multiple
            inputFile                        
          />
          {imageErr && <PlainText>{imageErr}</PlainText>}
        </FormGroup>
        <FormGroup>
          <Label>Tạo tags</Label>
          <ChipInput
            fullWidth
            defaultValue={tags}
            newChipKeyCodes={[32]}
            onChange={(chip) => handleChangeChip(chip)}   
            blurBehavior="add"         
          />
          {tagsErr && <PlainText>{tagsErr}</PlainText>}
        </FormGroup>
        <FormGroup>
          <Label>Giá sản phẩm</Label>
          <CustomNumberFormat
            value={price}
            allowLeadingZeros={false}
            thousandSeparator={true}
            suffix={" Đ"}
            allowNegative={false}
            allowEmptyFormatting={true}
            onValueChange={({floatValue}) => setPrice(floatValue)}
          />
          {priceErr && <PlainText>{priceErr}</PlainText>}
        </FormGroup>
        <FormInline>
          <FormGroup style={{ width: "auto" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isDiscount}
                  onChange={(e) => setIsDiscount(e.target.checked)}
                  name="checkedB"
                  color="primary"
                />
              }
              label="SP giảm giá"
            />           
          </FormGroup>
          <FormGroup style={{ flex: 1 }}>
            <FormGroupAnimation isDiscount={isDiscount}>
              <Label>
                <Required>Khuyến mãi</Required>
              </Label>
              <CustomNumberFormat
                value={discount}
                allowLeadingZeros={false}
                thousandSeparator={true}
                allowNegative={false}
                allowEmptyFormatting={true}
                onValueChange={({floatValue}) => setDiscount(floatValue)}
                suffix={" %"}        
                isAllowed={({floatValue}) => floatValue >= 0 && floatValue <= 100}        
              />
              {discountErr && <PlainText style={{top : "90%"}}>{discountErr}</PlainText>}
            </FormGroupAnimation>
          </FormGroup>
          <FormGroup style={{ flex: 1 }}>
            <FormGroupAnimation isDiscount={isDiscount}>
              <Label>
                <Required>Thời hạn</Required>
              </Label>              
              <Input type="date" onChange={e => setDiscountExpDate(e.target.value)}/>
              {discountExpDateErr && <PlainText style={{top : "52%"}}>{discountExpDateErr}</PlainText>}
            </FormGroupAnimation>
          </FormGroup>
        </FormInline>
        <FormGroup>
          <FormGroupAnimation isDiscount={isDiscount}>
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
        <List isDiscount={isDiscount}>
          <h4>Mô tả sản phẩm</h4>
          <CKEditor
            config={{
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
              ],
            }}
            editor={ClassicEditor}
            data={description}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
            }}
          />
          {descriptionErr && <PlainText >{descriptionErr}</PlainText>}
        </List>
        <List isDiscount={isDiscount}>
          <h4>Thông tin sản phẩm</h4>
          <CKEditor
            config={{
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
              ],
            }}
            editor={ClassicEditor}
            data={information}
            onChange={(event, editor) => {
              const data = editor.getData();
              setInformation(data);
            }}
          />
          {informationErr && <PlainText>{informationErr}</PlainText>}
        </List>
        <CustomButton>
          Tạo SP
        </CustomButton>
      </Form>
      <DisplayImage>
        {listBase64Image.map( (image,idx) => (
          <Image key={idx} src={image}/>
        ))}
      </DisplayImage>
    </FormCreateProductWrapper>
  );
};

export default FormCreateProduct;
