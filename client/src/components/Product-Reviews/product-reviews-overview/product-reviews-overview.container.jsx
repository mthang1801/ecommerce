import ProductReviews from "./product-reviews-overview.component";
import {connect} from "react-redux";
import {selectProductReviewsLoading} from "../../../redux/product-reviews/product-reviews.selectors";
import {createStructuredSelector} from "reselect";
import withSpinner from "../../../hoc/with-spinner/with-spinner.hoc"
const mapStateToProps = createStructuredSelector({
  isLoading : selectProductReviewsLoading
})

const ProductReviewsContainer = connect(mapStateToProps)(withSpinner(ProductReviews));

export default ProductReviewsContainer;