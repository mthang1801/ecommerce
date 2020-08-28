import React, {useEffect} from 'react'
import {CategoryManagementPageWrapper} from "./category-management.styles";
import Toolbar from "../../components/Category/toolbar/toolbar.component";
import {default as CategoryListTable} from "../../components/Category/index-category/index-category.container";
import AddCategory from "../../components/Category/add-category/add-category.component";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import {fetchCategoryList} from "../../redux/category/category.actions";
const CategoryManagementPage = ({match, fetchCategoryList}) => {  
  useEffect( () => {    
    fetchCategoryList()    
  } ,[fetchCategoryList])
  return (
    <CategoryManagementPageWrapper>
      <Toolbar/>
      <Route path={`${match.path}`} exact component={CategoryListTable}/>      
      <Route path={`${match.path}/add-category`} component={AddCategory}/>      
    </CategoryManagementPageWrapper>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchCategoryList : () => dispatch(fetchCategoryList())
})

export default connect(null, mapDispatchToProps)(CategoryManagementPage)
