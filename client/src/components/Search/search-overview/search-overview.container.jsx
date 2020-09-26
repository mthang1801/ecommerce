import SearchOverview from "./search-overview.component";
import {createStructuredSelector} from "reselect"
import {connect} from "react-redux" 
import {selectIsLoading} from "../../../redux/search/search.selectors"
import withSpinner from "../../../hoc/with-spinner/with-spinner.hoc";
const mapStateToProps = createStructuredSelector({
  isLoading : selectIsLoading
})

const SearchOverviewContainer = connect(mapStateToProps)(withSpinner(SearchOverview))

export default SearchOverviewContainer