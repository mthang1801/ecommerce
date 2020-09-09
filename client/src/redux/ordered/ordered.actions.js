import orderedActionTypes from "./ordered.styles";
import urls from "../../utils/urls";
import axios from "axios";
const fetchOrderedListStart = () => ({
  type: orderedActionTypes.FETCH_ORDERED_LIST_START,
});

const fetchOrderedListSuccess = (orderedList) => ({
  type: orderedActionTypes.FETCH_ORDERED_LIST_SUCCESS,
  payload: orderedList,
});

const fetchOrderedListFail = (error) => ({
  type: orderedActionTypes.FETCH_ORDERED_LIST_FAIL,
  payload: error.message,
});

export const fetchOrderedList = () => async (dispatch) => {
  try {
    dispatch(fetchOrderedListStart());
    console.log(axios.defaults.headers);
    const { data } = await axios.get(urls.FETCH_ORDERED_LIST);
    dispatch(fetchOrderedListSuccess(data));
  } catch (error) {
    dispatch(fetchOrderedListFail(error.message));
  }
};
