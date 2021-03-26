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
  Select,
  SelectIcon,
  ListAPI,
  ItemAPI,
  FormDropdown,
  Placeholder,
} from "../Custom/styles/CustomFormAdmin.styles";
import { FaChevronDown } from "react-icons/fa";
import { AdminAddContainer, DisplayImage } from "./styles/AdminAdd.styles";
import { generateBase64Image } from "../../utils/image";
import removeVietnameseTones from "../../utils/removeVietnameseTones";
import { fetchPortfolios } from "../../utils/connectDB";
import Button from "@material-ui/core/Button";

const AdminAdd = ({ onAdd, localesData, role }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [imgBase64, setImageBase64] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [openPortfolioDropdown, setOpenPortfolioDropdown] = useState(false)
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const formRef = useRef(null);
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setError(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    let _isMounted = true; 
    if (role === "category") {
      fetchPortfolios().then((data) => {
        if (data.portfolios) {
          if(_isMounted){
            setPortfolios([...data.portfolios]);
          }          
        }
      });
    }
    return () => _isMounted = false ;
  }, [role]);
  const postInputChangeHandler = (e) => {
    let fileData = e.target.files[0];
    setImage(fileData);
    generateBase64Image(fileData)
      .then((res) => setImageBase64(res))
      .catch((err) => console.log(err));
  };

  const onChangeCategoryName = (e) => {
    const { value } = e.target;
    const newSlug = removeVietnameseTones(value)
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, "-");
    setName(value);
    setSlug(newSlug);
  };

  const isValidForm = () => {
    const validImage = ["image/jpeg", "image/jpg", "image/png"];
    if(!name || name?.length < 3 || !slug || !image || !validImage.includes(image.type)){
      return false; 
    }
    if(role === "category" && !selectedPortfolio){
      return false;
    }
    return true; 
  }
  

  useEffect(() => {
    if(isValidForm()){
      setDisabledSubmit(false);
    }else{
      setDisabledSubmit(true);
    }
  }, [name, slug, image, selectedPortfolio])

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);    
    if (!name || name.length < 3 || !slug || !image) {
      setError("You must fill all fields and name at least 3 characters");
      return;
    }
    let formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("slug", slug);
    if(role === "category"){
      formData.append("portfolioId", selectedPortfolio._id)
    }
    onAdd(formData)
      .then((res) => {
        setSuccess("Created Category Success!!");
        setImage(null);
        setName("");
        setSlug("");
        setImageBase64(null);
        formRef.current.reset();
      })
      .catch((err) => {
        setError(err);
      });
  };
  return (
    <AdminAddContainer>
      <Form ref={formRef} onSubmit={handleSubmitForm}>
        <Title>{localesData.addTitle}</Title>
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
          <Label>{localesData.name}</Label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={onChangeCategoryName}
          />
        </FormGroup>
        <FormGroup>
          <Label>{localesData.slug}</Label>
          <Input type="text" name="slug" value={slug} disabled />
        </FormGroup>
        <FormGroup>
          <Label>{localesData.image}</Label>
          <Input type="file" name="image" onChange={postInputChangeHandler} />
        </FormGroup>
        <FormGroup>
          <Button color="primary" variant="contained" type="submit" disabled={disabledSubmit}>
            {localesData.submit}
          </Button>
        </FormGroup>
      </Form>
      {imgBase64 && (
        <DisplayImage>
          <img src={imgBase64} alt={slug} />
        </DisplayImage>
      )}
    </AdminAddContainer>
  );
};

export default AdminAdd;
