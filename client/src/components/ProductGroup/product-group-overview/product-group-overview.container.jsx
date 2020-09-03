import ProductGroupOverview from "./product-group-overview.component";
import {createStructuredSelector} from "reselect";
import {selectProductGroupLoading} from "../../../redux/product-group/product-group.selectors";
import withSpinner from "../../../hoc/with-spinner/with-spinner.hoc";
import {connect} from "react-redux";
const mapStateToProps = createStructuredSelector({
  isLoading : selectProductGroupLoading 
})

const ProductGroupOverviewContainer = connect(mapStateToProps)(withSpinner(ProductGroupOverview));
export default ProductGroupOverviewContainer;