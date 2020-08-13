import React, {useState} from 'react'
import {IndexProductTypesWrapper} from "./index-product-types.styles";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectProductTypesList, selectProductTypesCount} from "../../../redux/product-types/product-types.selectors";
import SearchForm from "../search-form/search-form.component";
import ListTableProductTypes from "../list-table-product-types/list-table-product-types.component";
const IndexProductTypes = ({productTypesList, count}) => {
  
  return (
    <IndexProductTypesWrapper>     
      <SearchForm/>
      <ListTableProductTypes data={productTypesList} count={count}/>
    </IndexProductTypesWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  productTypesList : selectProductTypesList,
  count : selectProductTypesCount
})

export default connect(mapStateToProps)(IndexProductTypes);
