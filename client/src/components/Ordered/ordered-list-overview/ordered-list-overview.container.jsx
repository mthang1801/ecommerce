import {connect} from "react-redux";
import {selectOrderedLoading} from "../../../redux/ordered/ordered.selectors";
import OrderedListOverview from "./ordered-list-overview.component";
import {createStructuredSelector} from "reselect";
import WithSpinner from "../../../hoc/with-spinner/with-spinner.hoc";
const mapStateToProps = createStructuredSelector({
  isLoading : selectOrderedLoading
})

const OrderedListOverviewContainer = connect(mapStateToProps)(WithSpinner(OrderedListOverview));

export default OrderedListOverviewContainer;