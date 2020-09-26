import React, {useEffect, useRef} from 'react'
import {ProductSearchPageWrapper} from "./product-search.styles";
import {default as SearchOverview} from "../../components/Search/search-overview/search-overview.container"
import Background from "../../components/Layout/background/background.component";
import MasterHeader from "../../components/Layout/master-header/master-header.component";
import {connect} from "react-redux";
import {onSearch} from "../../redux/search/search.actions"

const ProductSearchPage = ({onSearch, location}) => {
  const searchRef = useRef();
  useEffect(() => { 
    const urlParams = new URLSearchParams(window.location.search)
    const searchKey = urlParams.get("key") ;
    const page = +urlParams.get("page") || 1 ;         
    onSearch(searchKey, page)
    if(searchRef.current){
      window.scrollTo({
        top : searchRef.current.offsetTop, 
        behavior : "smooth"
      })
    }
  }, [window.location.search])
  return (
    <ProductSearchPageWrapper ref={searchRef}>
      <MasterHeader/>
      <Background label="Trang chủ/ Tìm kiếm"/>
      <SearchOverview/>
    </ProductSearchPageWrapper>
  )
}
const mapDispatchToProps = dispatch => ({
  onSearch : (searchKey,page) => dispatch(onSearch(searchKey,page))
})
export default connect(null, mapDispatchToProps)(ProductSearchPage)
