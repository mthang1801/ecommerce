import React, { useState, useContext, useEffect, useRef } from "react";
import {
  MasterSearchContainer,
  CategoryTypes,
  SearchInput,
  SearchButton,
} from "./master-search.styles";
import { FaSearch } from "react-icons/fa";
import {onSearch, setSearchKey} from "../../../redux/search/search.actions"
import {selectSearchKey} from "../../../redux/search/search.selectors"
import {createStructuredSelector} from "reselect"
import AppContext from "../../../context/app-viewport.context";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
const MasterSearch = ({history, onSearch, searchKey, setSearchKey}) => { 
  const [mobileView, setMobileView] = useState(window.innerWidth < 600);
  const width = useContext(AppContext);  
  const searchRef = useRef(null);  
  useEffect(() => {
    if (width < 600) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, [width]);

  const handleSearch = (e) => {
    e.preventDefault();    
    history.push(`/search?key=${searchKey}`)
  }
  return (
    <MasterSearchContainer mobileView={mobileView} onSubmit={handleSearch} ref={searchRef}>      
      <SearchInput
        type="text" placeholder="Tìm kiếm" 
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        style={{          
          fontSize: mobileView ? "1em" : "1.2em",          
          padding : mobileView ? "0 0.2rem" : "0 1rem",
          width :   mobileView ? "70%" : "50%"
        }}
      />
      <SearchButton mobileView={mobileView}><FaSearch/></SearchButton>
    </MasterSearchContainer>
  );
};
const mapStateToProps = createStructuredSelector({
  searchKey : selectSearchKey
})
const mapDispatchToProps = dispatch => ({
  onSearch : (searchKey) => dispatch(onSearch(searchKey)),
  setSearchKey : (searchKey) => dispatch(setSearchKey(searchKey))
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MasterSearch));
