import React, {useEffect} from 'react'
import {ShopGridPageContainer} from "./category.styles";
import {default as CategoryOverview} from "../../components/Category/category-overview/category-overview.container";
import MasterHeader from "../../components/Layout/master-header/master-header.component"
import Background from "../../components/Layout/background/background.component"
import {fetchCategory} from "../../redux/category/category.actions";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCategoryError, selectCategoryLoading , selectCategoryList} from "../../redux/category/category.selectors"
import PageNotFound from "../page-not-found/page-not-found.component"
import Loader from "../../components/UI/loader/loader.component"
const ShopGridPage = ({match, fetchCategory, location, error, loading, categoryList}) => { 
  console.log(error);
  useEffect(() => {
      let page = 1 ; 
      if(location.search){
        page = +location.search.split("=")[1];
      }          
        fetchCategory(match.params.categoryUrl, page)                  
  }, [fetchCategory]);
  if(loading){
    return <Loader/>
  }
  if(error && error.status == 404){
    return <PageNotFound/>
  }
  return (
    <ShopGridPageContainer>             
      <MasterHeader/>
      <Background label={categoryList.name}/>   
      <CategoryOverview/>
    </ShopGridPageContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  error : selectCategoryError,
  loading : selectCategoryLoading,
  categoryList : selectCategoryList
})
const mapDispatchToProps = dispatch => ({
  fetchCategory : (path,page) => dispatch(fetchCategory(path,page))
})
export default connect(mapStateToProps, mapDispatchToProps)(ShopGridPage)
