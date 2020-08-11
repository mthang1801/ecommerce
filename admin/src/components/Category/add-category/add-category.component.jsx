import React, { useState } from "react";
import {
  Form,
  Title,
  Label,
  FormGroup,
  Input,
  Feedback,
  Error,
  BtnSubmit  
} from "../../UI/custom-form/custom-form.styles";
import { AddCategoryContainer, DisplayImage,  } from "./add-category.styles";
import { generateBase64FromImage } from "../../../utils/image";
import axios from "../../../utils/axios";
const AddCategory = () => {
  const [name, setName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [imgBase64, setImageBase64] = useState(null);
  const [error, setError] = useState(null);
  const postInputChangeHandler = (e) => {
    setImageUrl(e.target.files[0])
    generateBase64FromImage(e.target)
      .then((res) => setImageBase64(res))
      .catch((err) => console.log(err));
  };
  const handleSubmitForm = e => {
    e.preventDefault(); 
    setError(null);
    if(!name || !linkUrl || !imageUrl){
      setError("You must fill all fields");
      return ;
    }
    let formData = new FormData();
    formData.append("image", imageUrl);
    formData.append("name", name);
    formData.append("linkUrl", linkUrl);
    axios.post("/admin/add-category", formData).then(res => console.log(res))
  }
  return (
    <AddCategoryContainer>
      <Form onSubmit={handleSubmitForm}>
        <Title>Thêm Danh mục sản phẩm</Title>
        {error && <Error>{error}</Error>}
        <FormGroup>
          <Label>Tên Danh mục</Label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Tạo liên kết</Label>
          <Input
            type="text"
            name="linkUrl"
            value={linkUrl}
            onChange={(e) => setLinkUrl(encodeURI(e.target.value))}
          />
          <Feedback>Không khoảnh trắng và ký tự đặc biệt</Feedback>
        </FormGroup>
        <FormGroup>
          <Label>Hình ảnh</Label>
          <Input
            type="file"
            name="imageUrl"
            onChange={postInputChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <BtnSubmit>Thêm Sản Phẩm</BtnSubmit>
        </FormGroup>
      </Form>
      {imgBase64 && (
        <DisplayImage>
          <img src={imgBase64} />
        </DisplayImage>
      )}
     
    </AddCategoryContainer>
  );
};

export default AddCategory;
