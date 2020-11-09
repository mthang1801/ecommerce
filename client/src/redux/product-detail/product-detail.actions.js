import productDetailActionTypes from "./product-detail.types";
import axios from "axios";
import urls from "../../utils/urls";
const fetchProductDetailStart = () => ({
  type: productDetailActionTypes.FETCH_PRODUCT_DETAIL_START,
});

const fetchProductDetailSuccess = (product, relatedProducts) => ({
  type: productDetailActionTypes.FETCH_PRODUCT_DETAIL_SUCCESS,
  payload: { product, relatedProducts },
});

const fetchProductDetailFail = (err) => ({
  type: productDetailActionTypes.FETCH_PRODUCT_DETAIL_FAIL,
  payload: { msg: err.response.data.message, status: err.response.status },
});

export const fetchProductDetail = (productId) => async (dispatch) => {
  try {
    dispatch(fetchProductDetailStart());
    const {
      data: { product, relatedProducts },
    } = await axios.get(
      urls.GET_CONTENT_PRODUCT_DETAIL_BY_PRODUCT_PATH_URL(productId)
    );
    dispatch(fetchProductDetailSuccess(product, relatedProducts));
  } catch (error) {
    dispatch(fetchProductDetailFail(error));
  }
};
