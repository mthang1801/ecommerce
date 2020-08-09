import React, { useState, useContext, useEffect } from "react";
import {
  MasterSearchContainer,
  CategoryTypes,
  SearchInput,
  SearchButton,
} from "./master-search.styles";
import { FaArrowDown } from "react-icons/fa";
import Icon from "../../UI/custom-icon/custom-icon.component";
import AppContext from "../../../context/app-viewport.context";
const MasterSearch = () => {
  const [textSearch, setTextSearch] = useState("");
  const [mobileView, setMobileView] = useState(window.innerWidth < 600);
  const width = useContext(AppContext);
  useEffect(() => {
    if (width < 600) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, [width]);
  return (
    <MasterSearchContainer mobileView={mobileView}>
      {!mobileView && (
        <CategoryTypes>
          Categories <Icon icon={<FaArrowDown />} />
        </CategoryTypes>
      )}
      <SearchInput
        type="text" placeholder="What do you need?" 
        value={textSearch}
        onChange={(e) => setTextSearch(e.target.value)}
        style={{          
          fontSize: mobileView ? "1em" : "1.2em",          
          padding : mobileView ? "0 0.2rem" : "0 1rem",
          width :   mobileView ? "70%" : "50%"
        }}
      />
      <SearchButton mobileView={mobileView}>Search</SearchButton>
    </MasterSearchContainer>
  );
};

export default MasterSearch;
