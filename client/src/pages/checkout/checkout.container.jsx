import Checkout from "./checkout.component";
import {createStructuredSelector} from "reselect";
import {selectUserLoading} from "../../redux/user/user.selectors";
import withSpinner from "../../hoc/with-spinner/with-spinner.hoc";
import {connect} from "react-redux";

const mapStateToProps = createStructuredSelector({
  isLoading : selectUserLoading
})

const CheckoutContainer = connect(mapStateToProps)(withSpinner(Checkout));

export default CheckoutContainer; 