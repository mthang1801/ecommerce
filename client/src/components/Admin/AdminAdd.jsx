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
import {
  fetchPortfolios,
  fetchCategoriesByPortfolio,
} from "../../utils/connectDB";
import Button from "@material-ui/core/Button";

const AdminAdd = ({ onAdd, localesData, role }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");    
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [imgBase64, setImageBase64] = useState(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openPortfolioDropdown, setOpenPortfolioDropdown] = useState(false);
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const portfolioRef = useRef(null);
  const categoryRef = useRef(null);
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
    if (role === "category" || role === "product-group") {
      fetchPortfolios().then((data) => {
        if (data.portfolios) {
          if (_isMounted) {            
            setPortfolios([...data.portfolios]);
            setIsFetched(true);
          }
        }
      });
    }else{
      setIsFetched(true);
    }
    return () => (_isMounted = false);
  }, [role]);
  useEffect(() => {
    if (selectedPortfolio) {
      fetchCategoriesByPortfolio(selectedPortfolio._id).then((data) => {
        if (data.categories) {
          setCategories([...data.categories]);
        }
      });
    }
  }, [selectedPortfolio]);
  const postInputChangeHandler = (e) => {
    let fileData = e.target.files[0];
    setImage(fileData);
    generateBase64Image(fileData)
      .then((res) => setImageBase64(res))
      .catch((err) => console.log(err));
  };

  const onChangePortfolio = (portfolio) => {
     setSelectedPortfolio({ ...portfolio });
     setSelectedCategory(null);
  }
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
    if (!name || name?.length < 3 || !slug) {
      return false;
    }   
    if (role === "portfolio") {
      if (!image || !validImage.includes(image.type)) {
        return false;
      }
    }
    if (role === "category" && !selectedPortfolio) {
      return false;
    }
    if (role === "product-group" && !(selectedCategory && selectedPortfolio)) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    function trackUserClickPortfolioRef(e) {
      if (portfolioRef.current && !portfolioRef.current.contains(e.target)) {
        setOpenPortfolioDropdown(false);
      }
    }
    window.addEventListener("click", trackUserClickPortfolioRef);
    return () =>
      window.removeEventListener("click", trackUserClickPortfolioRef);
  }, [portfolioRef]);
  useEffect(() => {
    function trackUserClickPortfolioRef(e) {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setOpenCategoryDropdown(false);
      }
    }
    window.addEventListener("click", trackUserClickPortfolioRef);
    return () =>
      window.removeEventListener("click", trackUserClickPortfolioRef);
  }, [categoryRef]);

  useEffect(() => {
    if (isValidForm()) {
      setDisabledSubmit(false);
    } else {
      setDisabledSubmit(true);
    }
  }, [name, slug, image, selectedPortfolio, selectedCategory]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    if (disabledSubmit) {
      setError("You must fill all fields and name at least 3 characters");
      return;
    }
    let formData = new FormData();
    if (role === "portfolio") {
      formData.append("image", image);
    }    
    formData.append("name", name);
    formData.append("slug", slug);
    if (role === "category" || role === "product-group") {
      formData.append("portfolioId", selectedPortfolio._id);
    }
    if (role === "product-group") {
      formData.append("categoryId", selectedCategory._id);
    }
    onAdd(formData)
      .then((res) => {
        setSuccess("Created Category Success!!");        
        setName("");
        setSlug("");        
        setSelectedCategory(null);
        setSelectedPortfolio(null);
        setLoading(false);
        formRef.current.reset();
       
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  if(!isFetched || loading) return <div>Loading...</div>
  return (
    <AdminAddContainer>
      <Form ref={formRef} onSubmit={handleSubmitForm}>
        <Title>{localesData.addTitle}</Title>
        {error && <Error>{error}</Error>}
        {success && <Success>{success}</Success>}
        {(role === "category" ||
          role === "product-group") && (
            <FormDropdown
              ref={portfolioRef}
              style={{ zIndex: openPortfolioDropdown ? 10 : 1 }}
              onClick={() =>
                setOpenPortfolioDropdown((prevState) => !prevState)
              }
            >
              <Label>{localesData.portfolioLabel}</Label>

              <Select>
                {selectedPortfolio && selectedPortfolio._id ? (
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
                    <ItemAPI
                      key={portfolio._id}
                      onClick={() => onChangePortfolio(portfolio)}
                    >
                      {portfolio.name}
                    </ItemAPI>
                  ))}
                </ListAPI>
              </Select>
            </FormDropdown>
          )}
        {role === "product-group" && (
          <FormDropdown
            ref={categoryRef}
            style={{ zIndex: openCategoryDropdown ? 11 : 1 }}
            onClick={() => {
              setOpenCategoryDropdown((prevState) => !prevState);
            }}
          >
            <Label>{localesData.categoryLabel}</Label>

            <Select>
              {selectedCategory && selectedCategory._id ? (
                <span>{selectedCategory.name}</span>
              ) : categories.length ? (
                <Placeholder>Select Category</Placeholder>
              ) : (
                <Placeholder>No Category</Placeholder>
              )}
              <SelectIcon>
                <FaChevronDown />
              </SelectIcon>
              <ListAPI show={openCategoryDropdown}>
                {categories.map((category) => (
                  <ItemAPI
                    key={category._id}
                    onClick={() => {
                      setSelectedCategory({ ...category });
                    }}
                  >
                    {category.name}
                  </ItemAPI>
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
        {role === "portfolio" && (
          <FormGroup>
            <Label>{localesData.image}</Label>
            <Input type="file" name="image" onChange={postInputChangeHandler} />
          </FormGroup>
        )}
        <FormGroup>
          <Label>{localesData.slug}</Label>
          <Input type="text" name="slug" value={slug} disabled />
        </FormGroup>       
        <FormGroup>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={disabledSubmit}
          >
            {localesData.submit}
          </Button>
        </FormGroup>
      </Form>
      {imgBase64 && role === "portfolio" && (
        <DisplayImage>
          <img src={imgBase64} alt={slug} />
        </DisplayImage>
      )}
    </AdminAddContainer>
  );
};

export default AdminAdd;
