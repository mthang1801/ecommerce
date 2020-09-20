import manufactorActionTypes from "./manufactor.types";
const INITIAL_STATE = {
  name: "",
  productGroupList: [],
  productList: [],
  loading: false,
  numPages: 0,
  currentPage: 1,
  maxPrice: 0,
  numProducts: 0,
  fetched: false,
  error: undefined,
  loadingProductList: false,
  isFilter: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case manufactorActionTypes.FETCH_CONTENT_LIST_BY_MANUFACTOR_PATH_URL_START:
      return {
        ...state,
        error: undefined,
        loading: true,
        fetched: true,
        isFilter: false,
      };
    case manufactorActionTypes.FETCH_PRODUCT_LIST_START:
      return {
        ...state,
        error: undefined,
        loadingProductList: true,
        isFilter: false,
      };
    case manufactorActionTypes.FILTER_PRODUCTS_BY_PRICE_START:
      return {
        ...state,
        error: undefined,
        loadingProductList: true,
        isFilter: true,
      };
    case manufactorActionTypes.FETCH_CONTENT_LIST_BY_MANUFACTOR_PATH_URL_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        productGroupList: action.payload.productGroupList,
        productList: action.payload.productList,
        numProducts: +action.payload.numProducts,
        currentPage: +action.payload.currentPage,
        numPages: +action.payload.numPages,
        maxPrice: +action.payload.maxPrice,
        loading: false,
      };
    case manufactorActionTypes.FETCH_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: action.payload,
        loadingProductList: false,
      };
    case manufactorActionTypes.FILTER_PRODUCTS_BY_PRICE_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        productGroupList: action.payload.productGroupList,
        productList: action.payload.productList,
        numProducts: +action.payload.numProducts,
        currentPage: +action.payload.currentPage,
        numPages: +action.payload.numPages,
        maxPrice: +action.payload.maxPrice,
        loading: false,
      };
    case manufactorActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: +action.payload,
        loadingProductList: false,
      };
    case manufactorActionTypes.FETCH_PRODUCT_LIST_FAIL:
      return {
        ...state,
        error: { msg: action.payload.msg, status: action.payload.status },
        loadingProductList: false,
      };
    case manufactorActionTypes.FETCH_CONTENT_LIST_BY_MANUFACTOR_PATH_URL_FAIL:
      return {
        ...state,
        error: { msg: action.payload.msg, status: action.payload.status },
        loading: false,
      };
    default:
      return state;
  }
};
