import React, {useEffect} from 'react'
import {CategoryPageWrapper} from "./category.styles";
import {default as CategoryOverview} from "../../components/Category/category-overview/category-overview.container";
import MasterHeader from "../../components/Layout/master-header/master-header.component"
import PageError from "../page-error/page-error.component"
import Background from "../../components/Layout/background/background.component"
import {fetchCategory, fetchProductList} from "../../redux/category/category.actions";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCategoryError, selectCategoryLoading , selectCategoryList, selectProductFetched} from "../../redux/category/category.selectors"
import Loader from "../../components/UI/loader/loader.component"
const CategoryPage = ({match, fetchCategory, location, error, loading, categoryList, fetchProductList, fetched}) => { 
  useEffect(() => {        
      let page = +location.search.split("=")[1] || 1 ;
      let categoryPath = match.params.categoryPath;      
      if(location.search && fetched){               
        fetchProductList(categoryPath, page);
        return ; 
      }         
      fetchCategory(categoryPath, page);
                    
  }, [fetchCategory, location.search, match.params.categoryPath]);
  if(loading){
    return <Loader/>
  }
  if(error){
    return <PageError error={error.msg}/>
  }
  if(!loading && categoryList){
    return (
      <CategoryPageWrapper>             
        <MasterHeader/>
        <Background label={`Trang chủ/ Danh mục sản phẩm/ ${categoryList.name}`}/>   
        <CategoryOverview/>
      </CategoryPageWrapper>
    )
  }
  
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
