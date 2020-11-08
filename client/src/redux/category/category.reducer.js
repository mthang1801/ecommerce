import categoryActionTypes from "./category.types";

const INITIAL_STATE = {
  categoryList: [],
  productTypeList: [],
  discountProductList: [],
  topRatedProducts: [],
  bestSellerProducts: [],
  productList: [],
  numProducts: 0,
  numPages: 0,
  currentPage: 1,
  maxPrice: 0,
  error: undefined,
  loading: false,
  loadingProductList: false,
  isFilter: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case categoryActionTypes.FETCH_CONTENT_LIST_BY_CATEGORY_PATH_URL_START:
      return {
        ...state,
        error: undefined,
        loading: true,
        isFilter: false,
      };
    case categoryActionTypes.FETCH_PRODUCT_LIST_START:
      return {
        ...state,
        error: undefined,
        loadingProductList: true,
        isFilter: false,
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
        currentPage: +action.payload.currentPage,
        maxPrice: +action.payload.maxPrice,
        loading: false,
      };

    case categoryActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: +action.payload,
        loadingProductList: false,
      };
    case categoryActionTypes.FETCH_PRODUCT_LIST_FAIL:

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
