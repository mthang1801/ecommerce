import React, {useRef, useState, useEffect} from 'react'
import {CreateProductPageWrapper} from "./create-product.styles";
import FormCreateProduct from "../../components/Product/form-create-product/form-create-product.component";
import Background from "../../components/Layout/background/background.component"
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
const CreateProductPage = ({user, match}) => { 
  if(!user){
    return <Redirect to={{
      pathname : "/auth",
      state : {from : match.path}
    }} />
  } 
  return (
    <CreateProductPageWrapper>
      <Background label="Đăng Sản Phẩm"/>
      <FormCreateProduct/>
    </CreateProductPageWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  user : selectCurrentUser
})

export default connect(mapStateToProps)(CreateProductPage)
