import React from 'react'
import MasterHeader from "../../components/Layout/master-header/master-header.component";
import {SellerPageContainer} from "./seller.styles";
import Background from "../../components/Layout/background/background.component";
import SellerOverview from "../../components/Seller/seller-overview/seller-overview.component";
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
