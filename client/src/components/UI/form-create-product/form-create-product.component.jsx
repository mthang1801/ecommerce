import React, { useState, useEffect, useContext } from "react";
import {
  Form,
  FormInline,
  FormGroup,
  Label,
  Input,
  Select,
  Required,
  Option,
  BtnRemove,
} from "./form-create-product.styles";
import AppContext from "../../../context/app-viewport.context";
import {
  getCategoryList,
  getProductsListByCategoryId,
  getProductsByProductType
} from "../../../utils/algorithms";

const categoryList = getCategoryList();

const FormCreateProduct = () => {
  const [category, setCategory] = useState({
    _id: "",
    name: "",
    linkUrl: "",
    products: [],
  });
  const [productTypeUrl, setProductTypeUrl] = useState(null);
  const [listProducts, setListProducts] = useState([]);
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

  useEffect(()=>{
    if(productTypeUrl){
      setListProducts(getProductsByProductType(productTypeUrl))
    }
  },[productTypeUrl])  
  const handleCategoryChange = (e) => {
    const category = categoryList.find((item) => item._id === e.target.value);
    setCategory(category);
  };

  const handleChangeProductTypes = (e) => {
    setProductTypeUrl(e.target.value);
  };

  return (
    <Form mobileView={mobileView} tabletView={tabletView}>
      <FormGroup>
        <Label>Nhóm sản phẩm</Label>
        <Select onChange={handleCategoryChange}>
          <Option value="#">Lựa chọn nhóm sản phẩm</Option>
          {categoryList.map((item) => (
            <Option key={item._id} value={item._id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Loại sản phẩm</Label>
        <Select
          value={productTypeUrl}
          onChange={handleChangeProductTypes}
          disabled={!category.products.length}
        >
          <Option value="#">Lựa chọn loại sản phẩm</Option>
          {category.products &&
            category.products.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}          
        </Select>
      </FormGroup>     
      <FormGroup>
        <Label></Label>
        
      </FormGroup>
    </Form>
  );
};

export default FormCreateProduct;
