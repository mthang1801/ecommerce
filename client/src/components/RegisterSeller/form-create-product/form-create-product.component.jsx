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
  PlainText,
  Title,
} from "../../UI/custom-form-second/custom-form-second.component";
import {
  FormCreateProductWrapper,
  CustomNumberFormat,
  List,
  DisplayImage,
  Image,
} from "./form-create-product.styles";
import AppContext from "../../../context/app-viewport.context";
import { getListCategory, getListProductType } from "../../../utils/algorithms";
import ChipInput from "material-ui-chip-input";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { generateBase64Image } from "../../../utils/image";
import "./form-create.styles.css";
import {connect} from "react-redux";
import {saveProductForm} from "../../../redux/seller/seller.actions";
import {selectCreateProductForm} from "../../../redux/seller/seller.selectors";
import {createStructuredSelector} from "reselect";
const FormCreateProduct = ({setDisabledNext, save,product, scroll}) => {
  const [listCatogory, setListCategory] = useState([]);
  const [listProductType, setListProductType] = useState([]);
  const {selectedCategory, selectedProductType ,name, manufactor, image,tags, price, isDiscount, discount, discountExpDate, description, information,} = product ; 
  
  const [listBase64Image, setListBase64Image] = useState([]);
 
  const [error, setError] = useState(false); 
  //#region  setView
  // const [mobileView, setMobileView] = useState(window.innerWidth < 600);
  // const [tabletView, setTabletView] = useState(
  //   window.innerWidth < 992 && window.innerWidth >= 660
  // );
  // const width = useContext(AppContext);
  // useEffect(() => {
  //   if (width < 660) {
  //     setMobileView(true);
  //   } else {
  //     setMobileView(false);
  //   }
  //   if (width < 992 && width >= 660) {
  //     setTabletView(true);
  //   } else {
  //     setTabletView(false);
  //   }
  // }, [width]);
  //#endregion
  
  useEffect(() => {
    window.scrollTo({
      top: scroll,
      behavior: "smooth",
    });
  }, [scroll]);

  useEffect(() => {
    let _mounted = true;
    getListCategory()
      .then((data) => {
        if (_mounted) {
          setListCategory([
            { _id: "", name: "Lựa chọn Nhóm Sản Phẩm", linkUrl: "" },
            ...data,
          ]);
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
    save({selectedCategory : {_id, name, linkUrl}})       
    getListProductType(_id)
      .then((data) => {
        setListProductType([...data]);
      })
      .catch((err) => setError(err));      
  };  
  const handleChangeProductType = (e) => {
    const index = e.target.selectedIndex;
    const _id = e.target.value;
    const linkUrl = e.target.childNodes[index].dataset.url;
    const name = e.target[index].text;    
    save({selectedProductType : {_id, name, linkUrl}});
  };
  const handleChangeImage = async (e) => {
    const length = e.target.files.length;
    let listImage = [];
    for (let i = 0; i < length; i++) {
      listImage.push(e.target.files[i]);
    }     
    save({image : [...listImage]})
    const imageBase64Promise = listImage.map(async (file) => {
      return await generateBase64Image(file);
    });
    const listImageBase64 = await Promise.all(imageBase64Promise);
    setListBase64Image(listImageBase64);
  };
  const handleChangeChip = (chip) => {      
    save({tags : chip})
  };
  useEffect(() => {     
  
    if ( !selectedCategory.name||
         !selectedCategory._id || 
         !selectedCategory.linkUrl || 
         !selectedProductType.name|| 
         !selectedProductType._id || 
         !selectedProductType.linkUrl ||
         name.trim().length < 3 || 
         !image.length ||         
         !price || price === 0||
         !tags.length || 
         (isDiscount && (!discount || typeof discount !== "number" || discount < 0 || discount > 100 || !discountExpDate)) || 
         !description || 
         !information || 
         !manufactor
         ) {
      return setDisabledNext(true);
    }       
    setDisabledNext(false);
  },[selectedCategory, selectedProductType,name,tags,isDiscount, discount, discountExpDate,description, information, manufactor ])
  
  return (
    <FormCreateProductWrapper>
      <Form>
        <Title>THÔNG TIN SẢN PHẨM</Title>
        {error && <h4>{error}</h4>}
        <FormGroup>
          <Label>Loại Sản Phẩm</Label>
          <Select
            value={selectedCategory._id}
            onChange={handleChangeCategory}
            style={{
              borderBottomColor: selectedCategory._id === "" ? "red" : "green",
            }}
          >
            {listCatogory.map((category) => (
              <Option
                key={category._id}
                value={category._id}
                data-url={category.linkUrl}
                disabled={!category._id}
              >
                {category.name}
              </Option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Nhóm Sản phẩm</Label>
          <Select
            defaultValue={selectedProductType._id}
            onChange={handleChangeProductType}
            style={{
              borderBottomColor:
                selectedProductType._id === "" ? "red" : "green",
            }}
          >
            <Option value="" disabled>
              Lựa chọn Loại SP
            </Option>
            {listProductType.map((productType) => (
              <Option
                key={productType._id}
                value={productType._id}
                data-url={productType.linkUrl}
                disabled={!productType._id}
              >
                {productType.name}
              </Option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="name">Tên Sản phẩm</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => { save({name : e.target.value}) } }
            style={{
              borderBottomColor: name.trim().length < 3 ? "red" : "green",
            }}
          />
          <PlainText>Tên SP phải có ít nhất 3 ký tự(*)</PlainText>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="manufactor">Nhà sản xuất</Label>
          <Input
            id="manufactor"
            type="text"
            value={manufactor}
            onChange={(e) => { save({manufactor : e.target.value})} }
            style={{
              borderBottomColor: !manufactor ? "red" : "green",
            }}
          />
          <PlainText>Bạn phải điền tên NSX(*)</PlainText>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="image">Tải hình ảnh</Label>
          <Input
            id="image"
            type="file"
            onChange={handleChangeImage}
            multiple
            inputFile
            style={{borderBottomColor: !image.length ? "red" : "green",}}
          />
          <PlainText>Bạn cần tải lên ít nhất 1 hình(*)</PlainText>
        </FormGroup>
        <FormGroup>
          <Label>Tạo tags</Label>
          <ChipInput
            fullWidth
            defaultValue={tags}
            newChipKeyCodes={[32,13]}
            onChange={(chip) => handleChangeChip(chip)}
            blurBehavior="add"
            style={{ marginTop: "0.75rem"}}
          />
          <PlainText>Bạn phải tạo tags, nhấn phím cách để thêm tags mới (*)</PlainText>
        </FormGroup>
        <FormGroup>
          <Label>Giá sản phẩm</Label>
          <CustomNumberFormat
            value={price}
            allowLeadingZeros={false}
            thousandSeparator={true}
            suffix={" VNĐ"}
            allowNegative={false}
            allowEmptyFormatting={true}
            onValueChange={({ floatValue }) => { save({price : floatValue})}}
            style={{borderBottomColor: !price ? "red" : "green",}}
          />
          <PlainText>Giá SP là bắt buộc (*)</PlainText>
        </FormGroup>
        <FormInline>
          <FormGroup style={{ width: "auto" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isDiscount}
                  onChange={(e) => {save({isDiscount : e.target.checked})} }
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
                style={{borderBottomColor: discount==0 || !discount ? "red" : "green",}}
                allowLeadingZeros={false}
                thousandSeparator={true}
                allowNegative={false}
                allowEmptyFormatting={true}
                onValueChange={({ floatValue }) => { save({discount : floatValue})}}
                suffix={" %"}
                isAllowed={({ floatValue }) =>
                  floatValue >= 0 && floatValue <= 100
                }
              />                                         
            </FormGroupAnimation>
          </FormGroup>
          <FormGroup style={{ flex: 1 }}>
            <FormGroupAnimation isDiscount={isDiscount}>
              <Label>
                <Required>Thời hạn</Required>
              </Label>
              <Input
                type="date"
                onChange={(e) =>{ save({discountExpDate : e.target.value}) }}
                style={{borderBottomColor: !discountExpDate ? "red" : "green",}}
              />
             
                <PlainText style={{ top: "52%" }}>
                  Bắt buộc (*)
                </PlainText>              
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
              save({description : data})
            }}
          />
          <PlainText>Bắt buộc (*)</PlainText>
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
              save({information : data})
            }}
          />  
          <PlainText>Bắt buộc(*)</PlainText>       
        </List>
      </Form>
      <DisplayImage>
        {listBase64Image.map((image, idx) => (
          <Image key={idx} src={image} />
        ))}
      </DisplayImage>
    </FormCreateProductWrapper>
  );
};
const mapStateToProps = createStructuredSelector ({
  product : selectCreateProductForm
})
const mapDispatchToProps = dispatch => ({
  save : (obj) => dispatch(saveProductForm(obj))
})
export default connect(mapStateToProps, mapDispatchToProps)(FormCreateProduct);
