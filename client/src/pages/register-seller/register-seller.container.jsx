import SellerPage from "./register-seller.component";
import {selectUserLoading} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import withSpinner from "../../hoc/with-spinner/with-spinner.hoc";

const mapStateToProps = createStructuredSelector({
  isLoading : selectUserLoading
})

const SellerPageContainer = connect(mapStateToProps)(withSpinner(SellerPage));

export default SellerPageContainer;