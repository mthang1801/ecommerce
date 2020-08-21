import React, {useEffect} from 'react'
import MasterHeader from "../../components/Layout/master-header/master-header.component";
import {SellerPageContainer} from "./register-seller.styles";
import Background from "../../components/Layout/background/background.component";
import SellerOverview from "../../components/RegisterSeller/register-seller-overview/register-seller-overview.component";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {Redirect} from "react-router-dom"
const SellerPage = ({user, match, history}) => {  
  if(!user){    
    history.location.state = match.path;
    return <Redirect to={{
      pathname : "/auth",
      state : { from : match.path}
    }}/>
  }
  if(user && user.role === "seller"){
    return <Redirect to="/" />
  }
  return (
    <SellerPageContainer>
      <MasterHeader/>
      <Background label={"Seller"}/>
      <SellerOverview/>
    </SellerPageContainer>
  )
}
const mapStateToProps = createStructuredSelector({
  user : selectCurrentUser
})
export default connect(mapStateToProps)(SellerPage)
