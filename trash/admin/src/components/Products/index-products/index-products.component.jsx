import React, {useState} from 'react'
import {IndexProductWrapper} from "./index-products.styles";
import SearchForm from "../search-form/search-form.component";
import ListTableProducts from "../list-table-product-types/list-table-product-types.component";
const IndexProductTypes = () => {
  
  return (
    <IndexProductWrapper>     
      {/* <SearchForm/> */}
      <ListTableProducts/>
    </IndexProductWrapper>
  )
}


export default IndexProductTypes;
