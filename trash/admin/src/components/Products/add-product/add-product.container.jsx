import AddProduct from "./add-product.component";
import {createStructuredSelector} from "reselect";
import {selectLoadingCategoryList} from "../../../redux/category/category.selector";
import WithSpinner from "../../../hoc/with-spinner/with-spinner.hoc";
import {connect} from "react-redux";

const mapStateToProps = createStructuredSelector({
  isLoading : selectLoadingCategoryList
})

const AddProductContainer= connect(mapStateToProps)(WithSpinner(AddProduct));

export default AddProductContainer;