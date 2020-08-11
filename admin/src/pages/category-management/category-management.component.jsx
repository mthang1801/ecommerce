import React from 'react'
import {CategoryManagementPageContainer} from "./category-management.styles";
import Toolbar from "../../components/Category/toolbar/toolbar.component";
import CategoryListTable from "../../components/Category/category-list-table/category-list-table.component";
import AddCategory from "../../components/Category/add-category/add-category.component";
import {Route} from "react-router-dom";
const CategoryManagementPage = ({match}) => {  
  return (
    <CategoryManagementPageContainer>
      <Toolbar/>
      <Route path={`${match.path}`} exact component={CategoryListTable}/>      
      <Route path={`${match.path}/add-category`} component={AddCategory}/>      
    </CategoryManagementPageContainer>
  )
}

export default CategoryManagementPage
