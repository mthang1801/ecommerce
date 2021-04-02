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
  Placeholder,
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
import { FaChevronDown } from "react-icons/fa";
import {
  fetchPortfolios,
  fetchCategoriesByPortfolio,
} from "../../utils/connectDB";
import removeVietnameseTones from "../../utils/removeVietnameseTones";
import useLanguage from "../Global/useLanguage";
const EditForm = ({ edit, setEdit, onEdit, role, localesData }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState(null);
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [openPortfolioDropdown, setOpenPortfolioDropdown] = useState(false);
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState("");
  const formRef = useRef(null);
  const portfolioRef = useRef(null);
  const categoryRef = useRef(null);
  const { i18n, lang } = useLanguage();
  const { updateSuccess, updateFailed } = i18n.store.data[
    lang
  ].translation.notification;
  useEffect(() => {
    if (edit) {
      setName(edit.name);
      setSlug(edit.slug);     
      if (role === "category") {
        setSelectedPortfolio(edit.portfolio);
      }
      if (role === "product-group") {
        setSelectedPortfolio(edit.portfolio);
        setSelectedCategory(edit.category);
      }
    }
  }, [edit, role]);
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error]);

  useEffect(() => {
    let _isMounted = true;
    if (role === "category" || role === "product-group") {
      fetchPortfolios().then((data) => {
        if (data.portfolios) {
          if (_isMounted) {
            setPortfolios([...data.portfolios]);
          }
        }
      });
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
    if (!name || name?.length < 3 || !slug) {
      return false;
    } else if (
      role === "product-group" &&
      name === edit.name &&
      selectedCategory?._id === edit.category._id &&
      selectedPortfolio === edit.portfolio?._id
    ) {
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
  }, [name, slug, selectedPortfolio, selectedCategory]);

  useEffect(() => {
    if (isValidForm()) {
      setDisabledSubmit(false);
    } else {
      setDisabledSubmit(true);
    }
  }, [name, slug, selectedPortfolio, role]);

  const onChangePortfolio = portfolio => {
    setSelectedPortfolio({...portfolio});
    setSelectedCategory(null);
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setError(null);
    if (disabledSubmit) {
      setError("You must fill all fields and name at least 3 characters");
      return;
    }
    let formData = new FormData();    
    formData.append("_id", edit._id);
    formData.append("name", name);
    formData.append("slug", slug);
    if (role === "category" || role === "product-group") {
      formData.append("portfolioId", selectedPortfolio._id);
    }
    if (role === "product-group") {
      formData.append("categoryId", selectedCategory._id);
    }
    onEdit(formData)
      .then((res) => {
        setEdit({});
      })
      .catch((error) => setError(updateFailed));
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
          {role === "category" ||
            (role === "product-group" && (
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
            ))}
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
            <Input
              type="text"
              name="slug"
              value={slug}
              onChange={() => {}}
              disabled
            />
          </FormGroup>         
          <Button
            variant="contained"
            color="primary"
            disabled={disabledSubmit}
            onClick={handleSubmitForm}
          >
            Cập nhật
          </Button>
        </Form>        
      </FormWrapper>
    </EditFormWrapper>
  );
};

export default EditForm;
