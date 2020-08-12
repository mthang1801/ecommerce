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
import { generateBase64FromImage } from "../../../utils/image";
import { addCategory } from "../../../redux/category/category.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCategoryList } from "../../../redux/category/category.selector";
const AddProductTypes = ({ categoryList, addCategory }) => {
  const [name, setName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [rootLink, setRootLink] = useState("");   
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const formRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error]);

  useEffect(() => {
    if (categoryList.length) {
      setRootLink(categoryList[0].linkUrl);
    }
  }, [categoryList]);
 
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!name || name.length < 3 || !linkUrl ) {
      setError("You must fill all fields and name at least 3 characters");
      return;
    }
    let formData = new FormData();    
    formData.append("name", name);
    formData.append("linkUrl", `${rootLink}/${linkUrl}`);

  };

  const handleSelectChange = (e) => {
    setRootLink(e.target.value);
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
          <Select onChange={handleSelectChange}>
            {categoryList.map((categoryItem) => (
              <Option key={categoryItem._id} value={categoryItem.linkUrl}>
                {categoryItem.name}
              </Option>
            ))}
          </Select>
        </FormGroup>

       
          <FormGroup>
            <Input value={rootLink} disabled/>
          </FormGroup>

          <FormGroup>
            <Label>Tạo đường dẫn liên kết</Label>
            <Input
              type="text"
              name="linkUrl"
              value={linkUrl}
              onChange={(e) =>
                setLinkUrl(e.target.value.replace(/[^a-zA-Z0-9/-]/g, ""))
              }
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
  addCategory: (category) => dispatch(addCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProductTypes);
