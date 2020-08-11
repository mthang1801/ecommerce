import IndexCategory from "./index-category.component";
import {createStructuredSelector} from "reselect";
import {selectLoadingCategoryList} from "../../../redux/category/category.selector";
import WithSpinner from "../../../hoc/with-spinner/with-spinner.hoc";
import {connect} from "react-redux";

const mapStateToProps = createStructuredSelector({
  isLoading : selectLoadingCategoryList
})

const IndexCategoryContainer= connect(mapStateToProps)(WithSpinner(IndexCategory));

export default IndexCategoryContainer;