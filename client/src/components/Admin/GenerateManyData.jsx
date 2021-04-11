import React, { useState, useRef, useEffect } from "react";
import ChipInput from "material-ui-chip-input";
import {
  fetchPortfolios,
  fetchCategoriesByPortfolio,
} from "../../utils/connectDB";
import { Wrapper } from "./styles/GenerateManyData.styles";
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
import Button from "@material-ui/core/Button";
const AutoGenerateData = ({ localesData, role, onGenerate }) => {
  const [chipsData, setChipsData] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [categories, setCategories] = useState([]);
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
    } else {
      setIsFetched(true);
    }
    return () => (_isMounted = false);
  }, [role]);

  const onChangePortfolio = (portfolio) => {
    setSelectedPortfolio({ ...portfolio });
    setSelectedCategory(null);
  };

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

  const isValidForm = () => {
    if (role === "category" && !selectedPortfolio) {
      return false;
    }
    if (role === "product-group" && !(selectedCategory && selectedPortfolio)) {
      return false;
    }

    if(!chipsData.length){
      return false ; 
    }

    return true;
  };

  useEffect(() => {
    if (isValidForm()) {
      setDisabledSubmit(false);
    } else {
      setDisabledSubmit(true);
    }
  }, [selectedPortfolio, selectedCategory, chipsData]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData();
    formData.append("portfolioId", selectedPortfolio._id);
    if(role === "product-group"){
      formData.append("categoryId" , selectedCategory._id);
    } 
    formData.append("productGroupsList",JSON.stringify(chipsData));
    onGenerate(formData) .then((res) => {
      setSuccess("Created Category Success!!");     
      setSelectedCategory(null);
      setSelectedPortfolio(null);
      setLoading(false);
  setChipsData([])
      formRef.current.reset();
    })
    .catch((err) => {
      setError(err);
      setLoading(false);
    });
  };

  if (!isFetched || loading) return <div>Loading...</div>;

  const handleChangeChipData = (chip) => {
    setChipsData((prevChips) => [...prevChips, chip]);
  };
  const handleDeleteChipData = (_, index) => {
    setChipsData((chips) => [...chips.filter((chip, idx) => index !== idx)]);
  };
  return (
    <Wrapper>
      <Form ref={formRef} >
        <Title>{localesData.autogenerateTitle}</Title>
        {error && <Error>{error}</Error>}
        {success && <Success>{success}</Success>}
        {(role === "category" || role === "product-group") && (
          <FormDropdown
            ref={portfolioRef}
            style={{ zIndex: openPortfolioDropdown ? 10 : 1 }}
            onClick={() => setOpenPortfolioDropdown((prevState) => !prevState)}
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
              selectedPortfolio &&
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
        <ChipInput
          value={chipsData}
          onAdd={(chip) => handleChangeChipData(chip)}
          onDelete={(_, index) => handleDeleteChipData(_, index)}
          size="small"
          variant="outlined"
          fullWidth
          newChipKeyCodes={[13, 9]}
          blurBehavior="add"
          label={localesData.autoGenerateDataLabel}
        />
        </FormGroup>
        <FormGroup>
          <Button
            color="primary"
            variant="contained"
            type="button"
            disabled={disabledSubmit}
            onClick={handleSubmitForm}
          >
            {localesData.submit}
          </Button>
        </FormGroup>
      </Form>
    </Wrapper>
  );
};

export default AutoGenerateData;
