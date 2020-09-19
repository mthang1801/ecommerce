import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOrderedList } from "../../redux/ordered/ordered.actions";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser, selectUserLoading } from "../../redux/user/user.selectors";
import { OrderedListContainer } from "./ordered.styles";
import { default as OrderedListOverview } from "../../components/Ordered/ordered-list-overview/ordered-list-overview.container";
import Background from "../../components/Layout/background/background.component"
import { Redirect } from "react-router-dom";
const Ordered = ({ fetchOrderedList, currentUser, match,userLoading }) => {
  useEffect(() => {
    if(!userLoading && currentUser){
      fetchOrderedList();
    }    
  }, [fetchOrderedList,userLoading, currentUser]);
  if (!currentUser)
    return (
      <Redirect to={{ pathname: "/auth", state: { from: match.path } }} />
    );
  return (
    <OrderedListContainer>
      <Background label={`Trang chủ / Lịch sử giao dịch`}/>
      <OrderedListOverview />
    </OrderedListContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userLoading : selectUserLoading
});
const mapDispatchToProps = (dispatch) => ({
  fetchOrderedList: () => dispatch(fetchOrderedList()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Ordered);
