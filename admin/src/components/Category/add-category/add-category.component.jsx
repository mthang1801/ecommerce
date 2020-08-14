import React, { useState, useEffect , useRef} from "react";
import {
  Form,
  Title,
  Label,
  FormGroup,
  Input,
  Feedback,
  Error,
  Success,
  BtnSubmit  
} from "../../UI/custom-form/custom-form.styles";
import { AddCategoryContainer, DisplayImage,  } from "./add-category.styles";
import { generateBase64FromImage } from "../../../utils/image";
import {addCategory} from "../../../redux/category/category.actions";
import {connect} from "react-redux";
const AddCategory = ({addCategory}) => {
  const [name, setName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [imgBase64, setImageBase64] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const formRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    },5000)
  },[error])

  const postInputChangeHandler = (e) => {
    setImageUrl(e.target.files[0])
    generateBase64FromImage(e.target)
      .then((res) => setImageBase64(res))
      .catch((err) => console.log(err));
  };
  const handleSubmitForm = e => {
    e.preventDefault(); 
    setError(null);
    setSuccess(null);
    if(!name || name.length < 3 || !linkUrl || !imageUrl){      
      setError("You must fill all fields and name at least 3 characters");
      return ;
    }
    let formData = new FormData();
    formData.append("image", imageUrl);
    formData.append("name", name);
    formData.append("linkUrl", linkUrl);
    addCategory(formData).then(res => {
      setSuccess("Created Category Success!!");
      setImageUrl(null);
      setName("");
      setLinkUrl("");
      setImageBase64(null);
      formRef.current.reset();
    })
    .catch(err => {console.log(err)})
      
  }
  return (
    <AddCategoryContainer>
      <Form ref={formRef} onSubmit={handleSubmitForm}>
        <Title>Thêm Nhóm sản phẩm</Title>
        {error && <Error>{error}</Error>}
        {success && <Success>{success}</Success>}
        <FormGroup>
          <Label>Tên Nhóm</Label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Tạo Đường dẫn liên kết</Label>
          <Input
            type="text"
            name="linkUrl"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value.replace(/[^a-zA-Z0-9/-]/g, ""))}
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
          <BtnSubmit>Thêm Nhóm Sản phẩm</BtnSubmit>
        </FormGroup>
      </Form>
      {imgBase64 && (
        <DisplayImage>
          <img src={imgBase64} alt={linkUrl}/>
        </DisplayImage>
      )}
     
    </AddCategoryContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  addCategory : category => dispatch(addCategory(category))
})

export default connect(null, mapDispatchToProps)(AddCategory);
