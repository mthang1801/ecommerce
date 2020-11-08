import productGroupActionTypes from "./product-group.types";

const INITIAL_STATE = {
  name: "",
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
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productGroupActionTypes.FETCH_CONTENT_LIST_BY_PRODUCT_GROUP_START:
      return {
        ...state,
        error: undefined,
        loading: true,
        fetched: true,
        isFilter: false,
      };
    
    case productGroupActionTypes.FETCH_CONTENT_LIST_BY_PRODUCT_GROUP_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
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
    
    case productGroupActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: +action.payload,
        loadingProductList: false,
      };
    
    case productGroupActionTypes.FETCH_CONTENT_LIST_BY_PRODUCT_GROUP_FAIL:
      return {
        ...state,
        error: { msg: action.payload.msg, status: action.payload.status },
        loading: false,
      };
    default:
      return state;
  }
};
