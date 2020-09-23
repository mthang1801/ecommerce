import CategoriesSlider from "./categories-slider.component";
import {selectHomeIsLoading} from "../../../redux/home/home.selectors"
import {connect} from "react-redux" 
import {createStructuredSelector} from "reselect"
import withSpinner from "../../../hoc/with-spinner/with-spinner.hoc";

const mapStateToProps = createStructuredSelector({
  isLoading : selectHomeIsLoading
})

const CategoriesSliderContainer = connect(mapStateToProps)(withSpinner(CategoriesSlider))

export default CategoriesSliderContainer