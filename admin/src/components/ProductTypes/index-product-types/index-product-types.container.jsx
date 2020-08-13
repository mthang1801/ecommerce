import IndexProductTypes from "./index-product-types.component";
import {createStructuredSelector} from "reselect";
import {selectProductTypesLoading} from "../../../redux/product-types/product-types.selectors";
import WithSpinner from "../../../hoc/with-spinner/with-spinner.hoc";
import {connect} from "react-redux";

const mapStateToProps = createStructuredSelector({
  isLoading : selectProductTypesLoading
})

const IndexProductTypesContainer= connect(mapStateToProps)(WithSpinner(IndexProductTypes));

export default IndexProductTypesContainer;