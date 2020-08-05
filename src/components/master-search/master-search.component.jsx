import React, {useState} from 'react'
import {MasterSearchContainer, CategoryTypes, SearchInput, SearchButton} from "./master-search.styles";
import {FaArrowDown} from "react-icons/fa";
import Icon from "../custom-icon/custom-icon.component"
const MasterSearch = () => {
  const [textSearch, setTextSearch] = useState("");  
  return (
    <MasterSearchContainer>
      <CategoryTypes>Categories <Icon icon={<FaArrowDown/>} /></CategoryTypes>
      <SearchInput value={textSearch} onChange={(e) => setTextSearch(e.target.value)}/>
      <SearchButton>Search</SearchButton>
    </MasterSearchContainer>
  )
}

export default MasterSearch
