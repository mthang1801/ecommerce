import React from 'react'
import {IndexCategoryWrapper} from "./index-category.styles";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCategoryList} from "../../../redux/category/category.selector";
import SearchForm from "../search-form/search-form.component";
import ListTableCategory from "../list-table-category/list-table-category.component";
const IndexCategory = ({categoryList}) => {
  return (
    <IndexCategoryWrapper>
      <SearchForm/>
      <ListTableCategory data={categoryList} />
    </IndexCategoryWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  categoryList : selectCategoryList
})

export default connect(mapStateToProps)(IndexCategory);
