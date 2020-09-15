import React from 'react'
import Toolbar from "../../components/HomeUI/toolbar/toolbar.component";
import {Route} from "react-router-dom";
import Menu from "../../components/HomeUI/menu/menu.component"
import ProductList from "../../components/HomeUI/product-list/product-list.component";
const ManagementHomeUI = ({match}) => {
  return (
    <div>
      <Toolbar/>
      <Route path={`${match.path}/menu`} component={Menu}/>
      <Route path={`${match.path}/product-list`} component={ProductList}/>
    </div>
  )
}

export default ManagementHomeUI

