import productDetailActionTypes from "./product-detail.types";
import axios from "axios";
import urls from "../../utils/urls";
const fetchProductDetailStart = () => ({
  type: productDetailActionTypes.FETCH_PRODUCT_DETAIL_START,
});

const fetchProductDetailSuccess = (product) => ({
  type: productDetailActionTypes.FETCH_PRODUCT_DETAIL_SUCCESS,
  payload: product,
});

const fetchProductDetailFail = (err) => ({
  type: productDetailActionTypes.FETCH_PRODUCT_DETAIL_FAIL,
  payload: { msg: err.response.data.message, status: err.response.status },
});

export const fetchProductDetail = (
  categoryPath,
  productTypePath,
  productPath
) => async (dispatch) => {
  try {
    dispatch(fetchProductDetailStart());
    const { data } = await axios.get(
      urls.GET_CONTENT_PRODUCT_DETAIL_BY_PRODUCT_PATH_URL(
        categoryPath,
        productTypePath,
        productPath
      )
    );
    dispatch(fetchProductDetailSuccess(data));
  } catch (error) {
    dispatch(fetchProductDetailFail(error));
  }
};
