import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  FormGroup,
  Input,
  Title,
  Label,
  Error,
  Success,
  FormDropdown,
  ListAPI,
  ItemAPI,
  Select,
  SelectIcon,
  Placeholder
} from "../Custom/styles/CustomFormAdmin.styles";
import Button from "@material-ui/core/Button";
import {
  EditFormWrapper,
  FormWrapper,
  DisplayImage,
  Image,
} from "./styles/EditForm.styles";
import Backdrop from "../UI/Backdrop";
import { generateBase64Image } from "../../utils/image";
import {FaChevronDown} from "react-icons/fa"
import {fetchPortfolios} from "../../utils/connectDB"
import removeVietnameseTones from "../../utils/removeVietnameseTones";
import useLanguage from "../Global/useLanguage"
const EditForm = ({ edit, setEdit, onEdit, role, localesData }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [error, setError] = useState(null);
  const [disabledButton, setDisabledButton] = useState(true);
  const [openPortfolioDropdown, setOpenPortfolioDropdown] = useState(false)
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);    
  const [portfolios, setPortfolios] = useState([]);
  const [success, setSuccess] = useState("");  
  const formRef = useRef(null);
  const {i18n, lang} = useLanguage()
  const {updateSuccess, updateFailed} = i18n.store.data[lang].translation.notification
  useEffect(() => {
    if (edit) {
      setName(edit.name);
      setSlug(edit.slug);
      setImage(edit.image);      
      if(role === "category"){
        setSelectedPortfolio(edit.portfolio)
      }
    }
  }, [edit, role]);  
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error]);

  useEffect(() => {
    let _isMounted = true ; 
    if (role === "category") {
      fetchPortfolios().then((data) => {
        if (data.portfolios) {
          if(_isMounted){
            setPortfolios([...data.portfolios]);
          }                    
        }
      });
    }
    return () => _isMounted = false;
  }, [role]);

  const postInputChangeHandler = (e) => {
    const fileData = e.target.files[0];    
    setImage(fileData);
    generateBase64Image(fileData)
      .then((res) => setImageBase64(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    function trackUserClickForm(e) {
      if (
        formRef.current &&
        !formRef.current.contains(e.target) &&
        Object.keys(edit).length
      ) {
        setEdit({});
      }
    }
    window.addEventListener("click", trackUserClickForm);
    return () => window.removeEventListener("click", trackUserClickForm);
  }, [formRef, edit]);

  const onChangePortfolioName = (e) => {
    const { value } = e.target;
    const newSlug = removeVietnameseTones(value).replace(/[^a-zA-Z0-9]+/g, "-");
    setName(value);
    setSlug(newSlug);
  };

  const isValidForm = () => {
    if(role === "category" && edit.portfolio?._id !== selectedPortfolio?._id){
      return true 
    } else if(role === "category" && edit.portfolio?._id === selectedPortfolio?._id && name === edit.name && slug === edit.slug && !imageBase64){
      return false 
    } else if (name === edit.name && slug === edit.slug && !imageBase64 ) {
      return false;
    }
    return true; 
  }
  useEffect(() => {
    if(isValidForm()){
      setDisabledButton(false);
    }else{
      setDisabledButton(true);
    }
  }, [name, slug,imageBase64, selectedPortfolio, role]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setError(null);
    if (name.length < 3 && !slug && !image) {
      setError("You must fill all fields and name at least 3 characters");
      return;
    }
    let formData = new FormData();
    
    formData.append("_id", edit._id);    
    if(imageBase64){
      formData.append("image", image);
    }    
    formData.append("name", name);
    formData.append("slug", slug);
    if(role === "category"){
      formData.append("portfolioId", selectedPortfolio._id);
    }
    onEdit(formData).then(res => {
      setEdit({})
    }).catch((error) => setError(updateFailed));
  };

  const showForm = Object.keys(edit).length > 0;

  return (
    <EditFormWrapper onSubmit={handleSubmitForm}>
      <Backdrop show={showForm} close={() => setEdit({})} />
      <FormWrapper show={showForm} ref={formRef}>
        <Form>
          <Title>Cập nhật Category</Title>
          {error && <Error>{error}</Error>}
          {success && <Success>{success}</Success>}
          {role=== "category" && (
          <FormDropdown style={{zIndex: openPortfolioDropdown ? 10 : 1}} onClick={() => setOpenPortfolioDropdown(prevState => !prevState)}>
            <Label>{localesData.portfolioLabel}</Label>

            <Select>
              { selectedPortfolio && selectedPortfolio._id ? (
                <span>{selectedPortfolio.name}</span>
              ) : portfolios.length ? (
                <Placeholder>Select Portfolio</Placeholder>
              ) : (
                <Placeholder>No Portfolio</Placeholder>
              )}
              <SelectIcon>
                <FaChevronDown />
              </SelectIcon>
              <ListAPI show={openPortfolioDropdown}>
                {portfolios.map((portfolio) => (
                  <ItemAPI key={portfolio._id} onClick={() => setSelectedPortfolio({...portfolio})}>{portfolio.name}</ItemAPI>
                ))}
              </ListAPI>
            </Select>
          </FormDropdown>
        )}
          <FormGroup>
            <Label>Tên Portfolio</Label>
            <Input
              type="text"
              name="name"
              value={name || ""}
              onChange={onChangePortfolioName}
            />
          </FormGroup>
          <FormGroup>
            <Label>Liên kết</Label>
            <Input type="text" name="slug" value={slug} onChange={() =>{}} disabled />
          </FormGroup>
          <FormGroup>
            <Label>Hình ảnh</Label>
            <Input
              type="file"
              name="edit-image"
              onChange={postInputChangeHandler}
            />
          </FormGroup>
          <Button variant="contained" color="primary" disabled={disabledButton} onClick={handleSubmitForm}>
            Cập nhật
          </Button>
        </Form>
        <DisplayImage>
          {imageBase64 ? (
            <Image src={imageBase64} />
          ) : image ? (
            <Image src={`data:${image.mimetype};base64,${image.data}`} />
          ) : null}
        </DisplayImage>
      </FormWrapper>
    </EditFormWrapper>
  );
};

export default EditForm;
