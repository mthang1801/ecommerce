import React, {useState, useEffect} from 'react'
import {Form,FormGroup, Input, Title, Label, Error, BtnSubmit} from "../../UI/custom-form/custom-form.styles";
import {EditFormWrapper, FormWrapper, DisplayImage, Image} from "./edit-form.styles"
import Backdrop from "../../UI/backdrop/backdrop.component";
import {generateBase64FromImage} from "../../../utils/image";
import {connect} from "react-redux";
import {editCategory} from "../../../redux/category/category.actions"
const EditForm = ({edit, setEdit, editCategory}) => {  
  const [name, setName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageBase64, setImageBase64] = useState(null);
  const [error, setError] = useState(null);  
  useEffect(() => {
    setName(edit.name);
    setLinkUrl(edit.linkUrl);
    setImageUrl(edit.imageUrl);
  }, [edit])
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
    if(!name || name.length < 3 || !linkUrl || !imageUrl){      
      setError("You must fill all fields and name at least 3 characters");
      return ;
    }
    let formData = new FormData();
    formData.append("_id", edit._id);
    formData.append("image", imageUrl);
    formData.append("name", name);
    formData.append("linkUrl", linkUrl);
    editCategory(formData)
    .catch(error => setError(error))
  }
  const showForm = Object.keys(edit).length >0;

  return (
    <EditFormWrapper onSubmit={handleSubmitForm}>
      <Backdrop show={showForm} close={() => setEdit({})}/>
      <FormWrapper show={showForm}>
        <Form >
          <Title>Cập nhật Category</Title>  
          {error && <Error>{error}</Error>}
          <FormGroup>
            <Label>Tên Category</Label>
            <Input type="text" name="name" value={name || ""} onChange={(e) => setName(e.target.value)}/>
          </FormGroup>
          <FormGroup>
            <Label>Liên kết</Label>
            <Input type="text" name="linkUrl" value={linkUrl || ""} onChange={(e) => setLinkUrl(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>Hình ảnh</Label>
            <Input type="file" onChange={postInputChangeHandler} />
          </FormGroup>         
          <BtnSubmit>Cập nhật</BtnSubmit> 
        </Form>          
        <DisplayImage>
          <Image src={imageBase64 ? imageBase64 : imageUrl ? `http://localhost:5000/images/${imageUrl}` : ""}/>
        </DisplayImage>      
      </FormWrapper>    
    </EditFormWrapper>
  )
}
const mapDispatchToProps = dispatch => ({
  editCategory : data => dispatch(editCategory(data))
})
export default connect(null, mapDispatchToProps)(EditForm)
