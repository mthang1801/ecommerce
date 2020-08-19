import React, { useState, useEffect, useContext } from "react";
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
} from "../../UI/custom-form-second/custom-form-second.component";
import {
  FormCreateProductWrapper,
  CustomNumberFormat,
  List,
} from "./form-create-product.styles";
import AppContext from "../../../context/app-viewport.context";
import { getListCategory, getListProductType } from "../../../utils/algorithms";
import ChipInput from "material-ui-chip-input";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./form-create.styles.css"
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
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);
  const [price, setPrice] = useState(null);
  const [isDiscount, setIsDiscount] = useState(false);
  const [discount, setDiscount] = useState(null);
  const [discountExpDate, setDiscountExpDate] = useState(null);
  const [description, setDescription] = useState("");
  const [information, setInformation] = useState("");
  const [manufactor, setManufactor] = useState("");
  const [error, setError] = useState(null);
  const [mobileView, setMobileView] = useState(window.innerWidth < 600);
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
    let _mounted = true;
    getListCategory()
      .then((data) => {
        setListCategory(data);
      })
      .catch((err) => setError(err));
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

  const handleChangeChip = (chip) => {
    setTags(chip);
  };

  const handleChangePrice = (value) => {
    let fValue = value.floatValue;
    setPrice(fValue);
  };
  const handleChangeDiscount = (value) => {
    let fValue = value.floatValue;
    setDiscount(fValue);
  };
  
  return (
    <FormCreateProductWrapper>
      <Form>
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
        </FormGroup>
        <FormGroup>
          <Select defaultValue={selectedProductType._id}>
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
        </FormGroup>
        <FormGroup>
          <Label>Tên Sản phẩm</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Nhà sản xuất</Label>
          <Input
            type="text"
            value={manufactor}
            onChange={(e) => setManufactor(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Tạo tags</Label>
          <ChipInput
            fullWidth
            defaultValue={tags}
            newChipKeyCodes={[32]}
            onChange={(chip) => handleChangeChip(chip)}
          />
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
            onValueChange={handleChangePrice}
          />
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
                onValueChange={handleChangeDiscount}
                suffix={" %"}
                isAllowed={({ floatValue }) =>
                  floatValue < 100 && floatValue >= 0
                }
              />
            </FormGroupAnimation>
          </FormGroup>
          <FormGroup style={{ flex: 1 }}>
            <FormGroupAnimation isDiscount={isDiscount}>
              <Label>
                <Required>Thời hạn</Required>
              </Label>
              <CustomNumberFormat
                placeholder="DD/MM/YYYY"
                value={discountExpDate}
                format="##/##/####"
                placeholder="DD/MM/YYYY"
                mask={["D", "D", "M", "M", "Y", "Y", "Y", "Y"]}
              />
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
        <List>
          <h4>Mô tả sản phẩm</h4>
          <CKEditor
            config={{
              toolbar:[ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList' ]
            }}
            
            editor={ClassicEditor}
            data={description}            
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
            }}            
          />
        </List>
        <List isDiscount={isDiscount}>
          <h4>Thông tin sản phẩm</h4>
          <CKEditor            
            config={{
              toolbar:[ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList']
            }}
            editor={ClassicEditor}
            data={information}            
            onChange={(event, editor) => {
              const data = editor.getData();
              setInformation(data);
            }}            
          />
        </List>
        
      </Form>
      
    </FormCreateProductWrapper>
  );
};

export default FormCreateProduct;
