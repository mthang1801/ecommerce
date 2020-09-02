import ManufactorOverview from "./manufactor-overview.component";
import {createStructuredSelector} from "reselect";
import {selectManufactorLoading} from "../../../redux/manufactor/manufactor.selectors";
import withSpinner from "../../../hoc/with-spinner/with-spinner.hoc";
import {connect} from "react-redux";
const mapStateToProps = createStructuredSelector({
  isLoading : selectManufactorLoading 
})

const ManufactorOverviewContainer = connect(mapStateToProps)(withSpinner(ManufactorOverview));
export default ManufactorOverviewContainer;