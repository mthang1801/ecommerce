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
  fetched: false,
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
        fetched: true,
        isFilter: false,
      };
    case categoryActionTypes.FETCH_PRODUCT_LIST_START:
      return {
        ...state,
        error: undefined,
        loadingProductList: true,
        isFilter: false,
      };
    case categoryActionTypes.FILTER_PRODUCTS_BY_PRICE_START:
      return {
        ...state,
        error: undefined,
        loadingProductList: true,
        isFilter: true,
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
    case categoryActionTypes.FETCH_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: action.payload,
        loadingProductList: false,
      };
    case categoryActionTypes.FILTER_PRODUCTS_BY_PRICE_SUCCESS:
      return {
        ...state,
        categoryList: action.payload.categoryList,
        productList: action.payload.productList,
        numProducts: +action.payload.numProducts,
        currentPage: +action.payload.currentPage,
        numPages: +action.payload.numPages,
        maxPrice: +action.payload.maxPrice,
        loadingProductList: false,
      };
    case categoryActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: +action.payload,
        loadingProductList: false,
      };
    case categoryActionTypes.FETCH_PRODUCT_LIST_FAIL:
    case categoryActionTypes.FILTER_PRODUCTS_BY_PRICE_FAIL:
      return {
        ...state,
        error: { msg: action.payload.msg, status: action.payload.status },
        loadingProductList: false,
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
