import IndexProducts from "./index-products.component";
import {createStructuredSelector} from "reselect";
import {selectProductsLoading} from "../../../redux/products/products.selectors";
import WithSpinner from "../../../hoc/with-spinner/with-spinner.hoc";
import {connect} from "react-redux";

const mapStateToProps = createStructuredSelector({
  isLoading : selectProductsLoading
})

const IndexProductsContainer= connect(mapStateToProps)(WithSpinner(IndexProducts));

export default IndexProductsContainer;