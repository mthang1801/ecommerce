import React , {lazy} from 'react'
import {Route, Switch, Redirect} from "react-router-dom"
import {createStructuredSelector} from "reselect"
import {selectCurrentUser} from "../redux/user/user.selectors"
import {connect} from "react-redux"

const AdminHome = lazy(() => import("./AdminHome"))
const AdminPortfolio = lazy(() => import("./AdminPortfolio"))
const Admin = ({match, user, history}) => {  
  if(!user){
    console.log(history)
    return <Redirect to={history.location.state?.from || "/" }/>
  }
  return (
    <Switch>
      <Route path={`${match.path}`} exact component={AdminHome} />      
      <Route path={`${match.path}/portfolio`} component={AdminPortfolio} />
    </Switch>
  )
}

const mapStateToProps = createStructuredSelector({
  user : selectCurrentUser
})

export default connect(mapStateToProps)(Admin)
