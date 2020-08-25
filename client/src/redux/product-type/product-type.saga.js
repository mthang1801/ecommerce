import { takeLatest, all, put, call } from "redux-saga/effects";
import * as productTypeActions from "./product-type.actions";
import axios from "axios";
import urls from "../../utils/urls";

export function* fetchProductType() {
  try {
    const { data } = yield axios.get(urls.GET_ALL_PRODUCT_TYPE_LIST);
    yield put(productTypeActions.fetchProductTypeSuccess(data));
  } catch (error) {
    yield put(
      productTypeActions.fetchProductTypeFail(error.response.data.message)
    );
  }
}

function* onFetchProductType() {
  yield takeLatest(productTypeActions.fetchProductTypeStart, fetchProductType);
}

export default function* categorySaga() {
  yield all([call(onFetchProductType)]);
}
