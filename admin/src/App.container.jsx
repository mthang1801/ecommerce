import App from "./App";
import {createStructuredSelector} from "reselect";
import {selectUserLoading} from "./redux/user/user.selectors";
import {connect} from "react-redux";
import WithSpinner from "./hoc/with-spinner/with-spinner.hoc";
const mapStateToProps = createStructuredSelector({
  isLoading : selectUserLoading
})

const AppContainer = connect(mapStateToProps)(WithSpinner(App));

export default AppContainer;