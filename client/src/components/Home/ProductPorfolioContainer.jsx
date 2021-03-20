import ProductPorfolio from "./ProductPorfolio";
import {selectHomeIsLoading} from "../../redux/home/home.selectors"
import {connect} from "react-redux" 
import {createStructuredSelector} from "reselect"
import withSpinner from "../../hoc/with-spinner/with-spinner.hoc";

const mapStateToProps = createStructuredSelector({
  isLoading : selectHomeIsLoading
})

const ProductPorfolioContainer = connect(mapStateToProps)(withSpinner(ProductPorfolio))

export default ProductPorfolioContainer