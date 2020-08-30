import categoryActionTypes from "./category.types";

const INITIAL_STATE = {
  categoryList: [],
  productTypeList: [],
  discountProductList: [],
  topRatedProducts: [],
  bestSellerProducts: [],
  latestProductList: [],
  numProducts: 0,
  numPages: 0,
  currentPage: 1,
  maxPrice: 0,
  error: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case categoryActionTypes.FETCH_CONTENT_LIST_BY_CATEGORY_PATH_URL_START:
      return {
        ...state,
        error: undefined,
        loading: true,
      };
    case categoryActionTypes.FETCH_CONTENT_LIST_BY_CATEGORY_PATH_URL_SUCCESS:
      return {
        ...state,
        categoryList: action.payload.categoryList,
        productTypeList: action.payload.productTypeList,
        discountProductList: action.payload.discountProductList,
        topRatedProducts: action.payload.topRatedProducts,
        bestSellerProducts: action.payload.bestSellerProducts,
        latestProductList: action.payload.latestProductList,
        productList: action.payload.productList,
        numProducts: +action.payload.numProducts,
        numPages: +action.payload.numPages,
        maxPrice: +action.payload.maxPrice,
        loading: false,
      };
    case categoryActionTypes.FETCH_CONTENT_LIST_BY_CATEGORY_PATH_URL_FAIL:
      return {
        ...state,
        error: { msg: action.payload.msg, status: action.payload.status },
        loading: false,
      };
    default:
      return state;
  }
};
