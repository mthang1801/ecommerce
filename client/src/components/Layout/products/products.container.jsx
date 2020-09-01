import Products from "./products.component";
import {createStructuredSelector} from "reselect";
import {selectLoadingProductList} from "../../../redux/category/category.selectors"
import {connect} from "react-redux"
import withSpinner from "../../../hoc/with-spinner/with-spinner.hoc";
const mapStateToProps = createStructuredSelector({
  isLoading : selectLoadingProductList
});

const ProductsContainer = connect(mapStateToProps)(withSpinner(Products));

export default ProductsContainer;