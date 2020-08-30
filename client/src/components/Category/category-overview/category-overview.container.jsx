import CategoryOverview from "./category-overview.component";
import {createStructuredSelector} from "reselect";
import {selectCategoryLoading} from "../../../redux/category/category.selectors";
import withSpinner from "../../../hoc/with-spinner/with-spinner.hoc";
import {connect} from "react-redux";
const mapStateToProps = createStructuredSelector({
  isLoading : selectCategoryLoading 
})

const CategoryOverviewContainer = connect(mapStateToProps)(withSpinner(CategoryOverview));
export default CategoryOverviewContainer;