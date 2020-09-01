import React, {useEffect} from 'react'
import {CategoryPageWrapper} from "./category.styles";
import {default as CategoryOverview} from "../../components/Category/category-overview/category-overview.container";
import MasterHeader from "../../components/Layout/master-header/master-header.component"
import Background from "../../components/Layout/background/background.component"
import {fetchCategory, fetchProductList} from "../../redux/category/category.actions";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCategoryError, selectCategoryLoading , selectCategoryList, selectProductFetched} from "../../redux/category/category.selectors"
import PageNotFound from "../page-not-found/page-not-found.component"
import Loader from "../../components/UI/loader/loader.component"
const CategoryPage = ({match, fetchCategory, location, error, loading, categoryList, fetchProductList, fetched}) => { 
  
  useEffect(() => {
      let page = +location.search.split("=")[1] || 1 ;
      let categoryUrl = match.params.categoryUrl;
    
      if(location.search && fetched){
               
        fetchProductList(categoryUrl, page);
        return ; 
      }         
      fetchCategory(categoryUrl, page);
                    
  }, [fetchCategory, location.search, match.params.categoryUrl]);
  if(loading){
    return <Loader/>
  }
  if(error && error.status == 404){
    return <PageNotFound/>
  }
  return (
    <CategoryPageWrapper>             
      <MasterHeader/>
      <Background label={categoryList.name}/>   
      <CategoryOverview/>
    </CategoryPageWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  error : selectCategoryError,
  loading : selectCategoryLoading,
  categoryList : selectCategoryList,
  fetched : selectProductFetched
})
const mapDispatchToProps = dispatch => ({
  fetchCategory : (path,page) => dispatch(fetchCategory(path,page)),
  fetchProductList : (path, page) => dispatch(fetchProductList(path, page))
})
export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
