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
  ErrorMessage,
  CloseBtn,
} from "../../UI/custom-form-second/custom-form-second.component";
import {
  FormCreateProductWrapper,
  CustomNumberFormat,
  List,
  DisplayImage,
  Image,
  Grid,
} from "./form-create-product.styles";
import AppContext from "../../../context/app-viewport.context";
import Button from "@material-ui/core/Button";
import {
  getListCategory,
  getListProductType,
  getListProductGroup,
} from "../../../utils/connectDB";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { generateBase64Image } from "../../../utils/image";
import "./form-create.styles.css";
import { connect } from "react-redux";
import { saveProductForm, clearAll } from "../../../redux/seller/seller.actions";
import { selectCreateProductForm } from "../../../redux/seller/seller.selectors";
import { createStructuredSelector } from "reselect";
import { createNewProduct } from "../../../utils/connectDB";
import FormComplete from "../form-complete/form-complete.component";
const FormCreateProduct = ({disabledNext, save, product, scroll, clearAll, setDisabledNext }) => {
  const [listCatogory, setListCategory] = useState([]);
  const [listProductType, setListProductType] = useState([]);
  const [listProductGroup, setListProductGroup] = useState([]);
  const [hideAddProductGroup, setHideAddProductGroup] = useState(true); 
  const [isFeeShip, setIsFeeShip] = useState(false);
  const {
    selectedCategory,
    selectedProductType,
    selectedProductGroup,  
    label,
    name,
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
    ship_fee
  } = product;
  const [disabled, setDisabled] = useState(true);
  const [listBase64Image, setListBase64Image] = useState([]);
  const [success, setSuccess] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(false);
  //#region  setView
  const [smallView, setSmallView] = useState(window.innerWidth <= 800);
  const width = useContext(AppContext);
  useEffect(() => {
    if (width <= 800) {
      setSmallView(true);
    } else {
      setSmallView(false);
    }
  }, [width]);
  //#endregion
  useEffect(() => {
    window.scrollTo({
      top: scroll + 300,
      behavior: "auto",
    });
    return () => clearAll();
  }, []);
  useEffect(() => {
    let _mounted = true;
    getListCategory()
      .then((data) => {
        if (_mounted) {
          setListCategory([            
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
    save({
      selectedCategory: { _id, name, linkUrl },
      selectedProductType: { _id: "", name: "", linkUrl: "" },
      selectedProductGroup: { _id: "", name: "" },
    });    
    if(_id === "!"){
      setListProductGroup([]);
      setListProductType([]);      
      save({
        selectedCategory: { _id : "", name : "", linkUrl : "" },
        selectedProductType: { _id: "", name: "", linkUrl: "" },
        selectedProductGroup: { _id: "", name: "" },
      });
      return ;
    }
    setHideAddProductGroup(true);
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
    save({
      selectedProductType: { _id, name, linkUrl },
      selectedProductGroup: { _id: "", name: "" },
    });
    
    if(_id === "!"){     
      save({
        selectedProductType: { _id : "", name: "", linkUrl : "" },
        selectedProductGroup: { _id: "", name: "" },
      });
      
      setListProductGroup([]);      
      return ;
    }
    setHideAddProductGroup(true);
    getListProductGroup(_id)
      .then((data) => {
        setListProductGroup([...data]);
      })
      .catch((err) => setError(err));
  };

  const handleChangeProductGroup = e => {
    const index = e.target.selectedIndex;
    const _id = e.target.value;   
    const name = e.target[index].text;
    if(_id === "#"){
      setHideAddProductGroup(false);
      save({selectedProductGroup : {_id , name : ""}});
    }else{
      setHideAddProductGroup(true);
      save({selectedProductGroup : {_id, name }})
    }
  }

  const handleChangeImage = async (e) => {
    const length = e.target.files.length;
    let listImage = [];
    for (let i = 0; i < length; i++) {
      listImage.push(e.target.files[i]);
    }
    save({ image: [...listImage] });
    const imageBase64Promise = listImage.map(async (file) => {
      return await generateBase64Image(file);
    });
    const listImageBase64 = await Promise.all(imageBase64Promise);
    setListBase64Image(listImageBase64);
  };

  const isValidForm = () => {
    if (
      !selectedCategory.name ||
      !selectedCategory._id ||
      !selectedCategory.linkUrl ||
      !selectedProductType.name ||
      !selectedProductType._id ||
      !selectedProductType.linkUrl ||
      !label.trim() ||
      !name.trim() ||
      !hideAddProductGroup && !selectedProductGroup.name ||
      !image.length ||
      !price ||      
      weight === 0 || 
      quantity === 0 ||
      price === 0 ||
      (isDiscount &&
        (!discount ||
          typeof discount !== "number" ||
          discount < 0 ||
          discount > 100 ||
          !discountExpDate)) ||
      !description ||
      !information ||
      !manufactor
    ) {
      return false;
    }else{
      return true
    }
  };

  useEffect(() => {
    if (!isValidForm()) {
      if(setDisabledNext){
        setDisabledNext(true);
      }
      
      return setDisabled(true);
    }
    if(setDisabledNext) {setDisabledNext(false)} ;
    setDisabled(false);
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
    quantity , 
    ship_fee
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
    return <FormComplete success={success} scroll={scroll} />;
  }
  return (
    <FormCreateProductWrapper smallView={smallView}>
      <Grid w60 smallView={smallView}>
        <Form onSubmit={handleSubmitForm}>
          <Title>THÔNG TIN SẢN PHẨM</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {error && <h4>{error}</h4>}
          <FormGroup>
            <Label>Danh mục SP</Label>
            <Select
              value={selectedCategory._id}
              onChange={handleChangeCategory}
              style={{
                borderBottomColor:
                  selectedCategory._id === "" ? "red" : "green",
              }}
            >
              <Option value="!">-- Lựa chọn danh mục SP --</Option>
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
          <FormGroup hide={!selectedCategory._id}>
            <Label>Loại Sản phẩm</Label>
            <Select
              value={selectedProductType._id}
              onChange={handleChangeProductType}
              style={{
                borderBottomColor:
                  selectedProductType._id === "" ? "red" : "green",
              }}
            >
              <Option value="!">-- Lựa chọn loại SP --</Option>
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
          <FormGroup hide={!selectedProductType._id}>
            <Label>Nhóm Sản phẩm</Label>
            <Select
              value={selectedProductGroup._id}    
              onChange={handleChangeProductGroup}          
            >
              <Option value="!">-- Lựa chọn nhóm SP (Nếu có) --</Option>
              {listProductGroup.map((productGroup) => (
                <Option key={productGroup._id} value={productGroup._id}>
                  {productGroup.name}
                </Option>
              ))}
              <Option value="#">Thêm nhóm SP</Option>
            </Select>
          </FormGroup>
          <FormGroup hide={hideAddProductGroup}>
            <Label htmlFor="groupName">Tên nhóm SP</Label>
            <Input
              id="groupName"
              type="text"
              value={selectedProductGroup.name}
              onChange={(e) => {
                save({selectedProductGroup: {_id : selectedProductGroup._id ,  name : e.target.value}});
              }}
              style={{
                borderBottomColor: !selectedProductGroup.name.trim()? "red" : "green",
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="label">Nhãn Sản phẩm</Label>
            <Input
              id="label"
              type="text"
              value={label}
              onChange={(e) => {
                save({ label: e.target.value });
              }}
              style={{
                borderBottomColor: !label.trim() ? "red" : "green",
              }}
            />
            <PlainText>Nhãn SP phải có ít nhất 3 ký tự(*)</PlainText>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="name">Tên Sản phẩm</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                save({ name: e.target.value });
              }}
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
              onChange={(e) => {
                save({ manufactor: e.target.value });
              }}
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
              style={{ borderBottomColor: !image.length ? "red" : "green" }}
            />
            <PlainText>Bạn cần tải lên ít nhất 1 hình(*)</PlainText>
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
              onValueChange={({ floatValue }) => {
                save({ price: floatValue });
              }}
              style={{ borderBottomColor: !price ? "red" : "green" }}
            />
            <PlainText>Giá SP là bắt buộc (*)</PlainText>
          </FormGroup>
          <FormInline>
            <FormGroup>
              <Label>Số Lượng</Label>
              <Input type="number" value={quantity == 0 ? "" : quantity} onChange={e => save({quantity : +e.target.value})} />
            </FormGroup>
            <FormGroup>
              <Label>Khối Lượng (kg)</Label>
              <Input type="number" value={weight == 0 ? "" : weight} onChange={e => save({weight : +e.target.value})} />
            </FormGroup>
          </FormInline>
          <FormInline>
            <FormGroup style={{ width: "auto" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isFeeShip}
                    onChange={(e) => {
                      if(isFeeShip){
                        save({ship_fee : 0})
                      }     
                      setIsFeeShip(prevState => !prevState)                                   
                    }}
                    name="fee-ship"
                    color="primary"
                  />
                }
                label="Phí vận chuyển"
              />
            </FormGroup>
            <FormGroup style={{ flex: 1 }}>
              <FormGroupAnimation show={isFeeShip}>
                <Label>
                  <Required>Phí vận chuyển</Required>
                </Label>
                <Input
                  type="number"
                  placeholder="VND"
                  value={ship_fee || ""}
                  onChange={(e) => save({ ship_fee: +e.target.value })}
                />
              </FormGroupAnimation>
            </FormGroup>
          </FormInline>
          <FormInline>
            <FormGroup style={{ width: "auto" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isDiscount}
                    onChange={(e) => {
                      save({ isDiscount: e.target.checked });
                      if (discount || discountExpDate) {
                        save({ discount: null, discountExpDate: null });
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
                  <Required>Khuyến mãi</Required>
                </Label>
                <Input
                  type="number"
                  placeholder="%"
                  value={discount || ""}
                  onChange={(e) => save({ discount: +e.target.value })}
                />
              </FormGroupAnimation>
            </FormGroup>
            <FormGroup style={{ flex: 1 }}>
              <FormGroupAnimation show={isDiscount}>
                <Label>
                  <Required>Thời hạn</Required>
                </Label>
                <Input
                  value={discountExpDate || ""}
                  type="date"
                  onChange={(e) => {
                    save({ discountExpDate: e.target.value });
                  }}
                  style={{
                    borderBottomColor: !discountExpDate ? "red" : "green",
                  }}
                />

                <PlainText style={{ top: "52%" }}>Bắt buộc (*)</PlainText>
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
          
          <List isDiscount={isDiscount} style={{ marginBottom: "6rem" }}>
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
                save({ description: data });
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
                save({ information: data });
              }}
            />
            <PlainText>Bắt buộc(*)</PlainText>
          </List>
          {disabledNext === undefined ? <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ display: "block", margin: "auto" }}
            disabled={disabled}
          >
            Tạo Sản Phẩm 
          </Button>: null }
        </Form>
      </Grid>
      <Grid smallView={smallView}>
        <DisplayImage smallView={smallView}>
          {listBase64Image.map((image, idx) => (
            <Image key={idx} src={image} />
          ))}
        </DisplayImage>
      </Grid>
    </FormCreateProductWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  product: selectCreateProductForm,
});
const mapDispatchToProps = (dispatch) => ({
  save: (obj) => dispatch(saveProductForm(obj)),
  clearAll : () => dispatch(clearAll())
});
export default connect(mapStateToProps, mapDispatchToProps)(FormCreateProduct);
