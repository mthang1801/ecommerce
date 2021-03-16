import React, { useState, useEffect, useRef, memo } from "react";
import {
  Form,
  Title,
  Label,
  FormGroup,
  Input,
  Feedback,
  Error,
  Success,
  Option,
  BtnSubmit,
  Select,
  FormInline,
} from "../../UI/custom-form/custom-form.styles";
import {
  AddProductWrapper,
  DisplayImage,
} from "./add-product.styles";
import { addProduct } from "../../../redux/products/products.actions"
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCategoryList } from "../../../redux/category/category.selector";
import axios from "axios";
import Backdrop from "../../UI/backdrop/backdrop.component";
import Spinner from "../../UI/spinner/spinner.component";
const AddProductTypes = ({addProduct, categoryList }) => {
  const [name, setName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [categoryLink, setCategoryLink] = useState(""); 
  const [rootLink, setRootLink] = useState("");
  const [productTypes, setProductTypes] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);  

  useEffect(() => {
    if (categoryList.length) {      
      setCategoryLink(categoryList[0].linkUrl);
    }
  }, [categoryList]);

  const handleChangeProductType = (e) => {
    let val = e.target.value ; 
    if(val[0] !== "/"){
      val = "/" + val.toLowerCase() ;
    }
    setLinkUrl(val.replace(/[^a-zA-Z0-9/-]/g, ""))
  }
  const handleSelectChange = (e) => {
    e.preventDefault();
    const categoryId = e.target.value ; 
    setCategoryLink(categoryId);   
    setLoading(true);
    axios.get("/list-links-product-types", {params : {id : categoryId}})
    .then(res => {
      setProductTypes(res.data);
      if(res.data.length){
        setRootLink(res.data[0].linkUrl)
      }
      setLoading(false);
    })
    .catch(err => console.log(err));
  };

  const handleChangeProductTypes = e => {
    setRootLink(e.target.value);
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!name || name.length < 3 || !linkUrl || linkUrl =="/" || !categoryLink|| categoryLink === "#" || !rootLink || rootLink === "#") {
      setError("You must fill all fields and name at least 3 characters");
      return;
    }
    if(linkUrl[0] !== "/"){
      linkUrl = "/" + linkUrl;
    }
    const data = {
      name, 
      linkUrl : rootLink + linkUrl,
      rootLink
    }
      
    addProduct(data).then(
      res => {
        setLinkUrl("");        
        setName("");
        setRootLink("");
        setProductTypes([]);
        setSuccess("Thêm SP thành công!");
        formRef.current.reset();
      }
    )
    .catch(err => {
      console.log(err);
      setError(err);
    })
  };
 console.log(productTypes)
  return (
    <AddProductWrapper>
      <Backdrop show={loading}/>
      {loading && <Spinner/>}
      <Form ref={formRef} onSubmit={handleSubmitForm}>
        <Title>Thêm SP</Title>
        {error && <Error>{error}</Error>}
        {success && <Success>{success}</Success>}
        <FormGroup>
          <Label>Tên SP</Label>
          <Input
            type="text"
            name="name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Lựa chọn nhóm SP</Label>
          <Select defaultValue="#" onChange={handleSelectChange}>
            <Option value="#" disabled>--Lựa chọn nhóm SP--</Option>
            {categoryList.map((categoryItem) => (
              <Option key={categoryItem._id} value={categoryItem._id}>
                {categoryItem.name}
              </Option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Lựa chọn loại SP</Label>
          <Select defaultValue="#" onChange={handleChangeProductTypes}>
          <Option value="#" disabled>--Lựa chọn loại SP--</Option>
            {productTypes.map((link) => (
              <Option key={link.name} value={link.linkUrl}>
                {link.name}
              </Option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
            <Label>Đường dẫn gốc</Label>
            <Input value={rootLink} disabled/>
          </FormGroup>
          <FormGroup>
            <Label>Tạo đường dẫn liên kết</Label>
            <Input
              type="text"
              name="linkUrl"
              value={linkUrl}
              onChange={handleChangeProductType}
            />
            <Feedback>Không khoảnh trắng và ký tự đặc biệt</Feedback>
          </FormGroup>       
          <FormGroup>
            <Label>Đường dẫn đầy đủ</Label>
            <Input
              type="text"
              name="linkUrl"
              value={rootLink + linkUrl}
              disabled
            />
            <Feedback>Không khoảnh trắng và ký tự đặc biệt</Feedback>
          </FormGroup>       
       
        <FormGroup>
          <BtnSubmit>Thêm SP</BtnSubmit>
        </FormGroup>
      </Form>     
    </AddProductWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  categoryList: selectCategoryList,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (product) => dispatch(addProduct(product)),
});

export default memo(connect(mapStateToProps, mapDispatchToProps)(AddProductTypes));
