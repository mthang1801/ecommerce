import productDetailActionTypes from "./product-detail.types";

const INITIAL_STATE = {
  product: null,
  loading: false,
  error: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productDetailActionTypes.FETCH_PRODUCT_DETAIL_START:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case productDetailActionTypes.FETCH_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        product: { ...action.payload },
        loading: false,
      };
    case productDetailActionTypes.FETCH_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        error: { msg: action.payload.msg, status: action.payload.status },
        loading: false,
      };
    default:
      return state;
  }
};
