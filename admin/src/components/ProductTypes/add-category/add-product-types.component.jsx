import React, { useState, useEffect, useRef } from "react";
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
  AddProductTypesWrapper,
  DisplayImage,
} from "./add-product-types.styles";
import { addProductType } from "../../../redux/product-types/product-types.actions"
import { addCategory } from "../../../redux/category/category.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCategoryList } from "../../../redux/category/category.selector";
const AddProductTypes = ({addProductType, categoryList }) => {
  const [name, setName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [rootLink, setRootLink] = useState(""); 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const formRef = useRef(null);
  
  
  const handleChangeProductType = (e) => {
    let val = e.target.value ; 
    if(val[0] !== "/"){
      val = "/" + val.toLowerCase() ;
    }
    setLinkUrl(val.replace(/[^a-zA-Z0-9/-]/g, ""))
  }
  const handleSelectChange = (e) => {
    setRootLink(e.target.value);
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!name || name.length < 3 || !linkUrl || linkUrl =="/" || !rootLink) {
      setError("You must fill all fields and name at least 3 characters");
      return;
    }
    if(linkUrl[0] !== "/"){
      linkUrl = "/" + linkUrl;
    }   
    let formData = new FormData();
    formData.append("name", name);
    formData.append("linkUrl", rootLink + linkUrl);
    formData.append("rootLink", rootLink)
    addProductType(formData).then(
      res => {
        setLinkUrl("");        
        setName("");
        setRootLink(categoryList[0].linkUrl)
        setSuccess("Thêm Loại SP thành công!");
        formRef.current.reset();
      }
    )
    .catch(err => {
      console.log(err);
      setError(err);
    })
  };
 
  return (
    <AddProductTypesWrapper>
      <Form ref={formRef} onSubmit={handleSubmitForm}>
        <Title>Thêm Loại SP</Title>
        {error && <Error>{error}</Error>}
        {success && <Success>{success}</Success>}
        <FormGroup>
          <Label>Tên Loại SP</Label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Lựa chọn nhóm SP</Label>
          <Select defaultValue="" onChange={handleSelectChange}>
            <Option value="" disabled>--Lựa chọn nhóm SP--</Option>
            {categoryList.map((categoryItem) => (
              <Option key={categoryItem._id} value={categoryItem.linkUrl}>
                {categoryItem.name}
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
          <BtnSubmit>Thêm Loại SP</BtnSubmit>
        </FormGroup>
      </Form>     
    </AddProductTypesWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  categoryList: selectCategoryList,
});

const mapDispatchToProps = (dispatch) => ({
  addProductType: (productType) => dispatch(addProductType(productType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProductTypes);
