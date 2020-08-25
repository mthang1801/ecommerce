import { put, takeLatest, all, call } from "redux-saga/effects";
import * as categoryActions from "./category.actions";
import urls from "../../utils/urls";
import axios from "axios";
export function* fetchCategory() {
  try {
    const { data } = yield axios.get(urls.GET_LIST_CATEGORY);
    yield put(categoryActions.fetchCategorySuccess(data));
  } catch (error) {
    yield put(categoryActions.fetchCategoryFail(error.response.data.message));
  }
}

function* onFetchCategory() {
  yield takeLatest(categoryActions.fetchCategoryStart, fetchCategory);
}

export default function* categorySaga() {
  yield all([call(onFetchCategory)]);
}
