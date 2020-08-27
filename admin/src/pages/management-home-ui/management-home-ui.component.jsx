import React from 'react'
import Toolbar from "../../components/HomeUI/toolbar/toolbar.component";
import {Route} from "react-router-dom";
import Menu from "../../components/HomeUI/menu/menu.component"
const ManagementHomeUI = ({match}) => {
  return (
    <div>
      <Toolbar/>
      <Route path={`${match.path}/menu`} component={Menu}/>
    </div>
  )
}

export default ManagementHomeUI

