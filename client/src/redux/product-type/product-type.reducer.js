import productTypeActionTypes from "./product-type.types";

const INITIAL_STATE = {
  name: "",
  productGroupList: [],
  manufactorList: [],
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
    case productTypeActionTypes.FETCH_CONTENT_LIST_BY_PRODUCT_TYPE_START:
      return {
        ...state,
        error: undefined,
        loading: true,
        fetched: true,
      };    
    case productTypeActionTypes.FETCH_CONTENT_LIST_BY_PRODUCT_TYPE_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        productGroupList: action.payload.productGroupList,
        manufactorList: action.payload.manufactorList,
        discountProductList: action.payload.discountProductList,
        topRatedProducts: action.payload.topRatedProducts,
        bestSellerProducts: action.payload.bestSellerProducts,
        productList: action.payload.productList,
        numProducts: +action.payload.numProducts,
        currentPage: +action.payload.currentPage,
        numPages: +action.payload.numPages,
        maxPrice: +action.payload.maxPrice,
        loading: false,
      };    
    case productTypeActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: +action.payload,
        loadingProductList: false,
      };    
    case productTypeActionTypes.FETCH_CONTENT_LIST_BY_PRODUCT_TYPE_FAIL:
      return {
        ...state,
        error: { msg: action.payload.msg, status: action.payload.status },
        loading: false,
      };
    default:
      return state;
  }
};
