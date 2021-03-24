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
} from "../../Custom/styles/CustomFormAdmin.styles";
import { AddPortfolioContainer, DisplayImage,  } from "./styles/AddPortfolio.styles";
import { generateBase64Image } from "../../../utils/image";
import {addAdminPortfolio} from "../../../redux/admin-portfolio/admin-portfolio.actions";
import removeVietnameseTones from "../../../utils/removeVietnameseTones"
import {connect} from "react-redux";
import useLanguage from "../../Global/useLanguage"
import Button from "@material-ui/core/Button"
const AddPortfolio = ({addAdminPortfolio}) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [imgBase64, setImageBase64] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const {i18n, lang} = useLanguage();
  const {porfolio} = i18n.store.data[lang].translation.admin
  const formRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    },5000)
  },[error])

  const postInputChangeHandler = (e) => {
    let fileData = e.target.files[0]    
    setImageUrl(fileData)
    generateBase64Image(fileData)
      .then((res) => setImageBase64(res))
      .catch((err) => console.log(err));
  };
  

  const onChangeCategoryName = e => {
    const {value} = e.target;
    const newSlug = removeVietnameseTones(value).trim().replace(/[^a-zA-Z0-9]+/g, "-")
    setName(value)
    setSlug(newSlug)
  }


  const handleSubmitForm = e => {
    e.preventDefault(); 
    setError(null);
    setSuccess(null);
    console.log(name, slug, imageUrl)
    if(!name || name.length < 3 || !slug || !imageUrl){      
      setError("You must fill all fields and name at least 3 characters");
      return ;
    }
    let formData = new FormData();
    formData.append("image", imageUrl);
    formData.append("name", name);
    formData.append("slug", slug);
    addAdminPortfolio(formData).then(res => {
      setSuccess("Created Category Success!!");
      setImageUrl(null);
      setName("");
      setSlug("");
      setImageBase64(null);
      formRef.current.reset();
    })
    .catch(err => {
      setError(err)
    })      
  }
  return (
    <AddPortfolioContainer>
      <Form ref={formRef} onSubmit={handleSubmitForm}>
        <Title>{porfolio.addTitle}</Title>
        {error && <Error>{error}</Error>}
        {success && <Success>{success}</Success>}
        <FormGroup>
          <Label>{porfolio.name}</Label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={onChangeCategoryName}
          />
        </FormGroup>
        <FormGroup>
          <Label>{porfolio.slug}</Label>
          <Input
            type="text"
            name="slug"
            value={slug}            
            disabled
          />         
        </FormGroup>
        <FormGroup>
          <Label>{porfolio.image}</Label>
          <Input
            type="file"
            name="image"          
            onChange={postInputChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Button color="primary" variant="contained" type="submit">{porfolio.submit}</Button>
        </FormGroup>
      </Form>
      {imgBase64 && (
        <DisplayImage>
          <img src={imgBase64} alt={slug}/>
        </DisplayImage>
      )}
     
    </AddPortfolioContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  addAdminPortfolio : category => dispatch(addAdminPortfolio(category))
})

export default connect(null, mapDispatchToProps)(AddPortfolio);
