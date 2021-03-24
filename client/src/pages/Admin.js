import React , {lazy} from 'react'
import {Route, Switch} from "react-router-dom"
const AdminHome = lazy(() => import("./AdminHome"))
const AdminCategory = lazy(() => import("./AdminCategory"))
const Admin = ({match}) => {  
  console.log(match)
  return (
    <Switch>
      <Route path={`${match.path}`} exact component={AdminHome} />      
      <Route path={`${match.path}/portfolio`} component={AdminCategory} />
    </Switch>
  )
}

export default Admin
