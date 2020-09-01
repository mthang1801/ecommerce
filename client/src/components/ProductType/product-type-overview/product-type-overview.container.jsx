import ProductTypeOverview from "./product-type-overview.component";
import {createStructuredSelector} from "reselect";
import {selectProductTypeLoading} from "../../../redux/product-type/product-type.selectors";
import withSpinner from "../../../hoc/with-spinner/with-spinner.hoc";
import {connect} from "react-redux";
const mapStateToProps = createStructuredSelector({
  isLoading : selectProductTypeLoading 
})

const ProductTypeOverviewContainer = connect(mapStateToProps)(withSpinner(ProductTypeOverview));
export default ProductTypeOverviewContainer;