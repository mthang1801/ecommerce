export default {
  REGISTER_URL: "/user/register",
  LOGIN_URL: "/user/login",
  LOGIN_FB_URL: "/user/login-facebook",
  LOGIN_GG_URL: "/user/login-google",
  FETCH_USER_URL: "/auth/user",
  LIST_CITIES_API: "/api/city",
  LIST_DISTRICTS_BASE_ON_CITY_ID_API: (id) => `/api/city/${id}/district`,
  LIST_WARDS_BASE_ON_DISRICT_ID_API: (id) => `/api/district/${id}/ward`,
  GET_LIST_CATEGORY: "/category",
  GET_LIST_PRODUCT_TYPE_BY_CATEGORYID: (id) => `/category/${id}/product-type`,
  GET_LIST_PRODUCT_GROUP_BY_PRODUCTTYPEID: (id) =>
    `/product-type/${id}/product-group`,
  POST_CREATE_NEW_PRODUCT: `/product`,
  UPDATE_ROLE_USER_AS_SELLER: `/user/register-seller`,
  FETCH_INITIAL_DATA: `/initial-data`,
  GET_LATEST_PRODUCTS: "/latest-products",
  GET_BEST_SELLER_PRODUCTS: "/best-seller-products",
  GET_TOP_RATED_PRODUCTS: "/top-rated-products",
  GET_CATEGORY_LIST: "/category",
  GET_CONTENT_LIST_BY_CATEGORY_PATH_URL: (pathUrl, page) =>
    `/category/${pathUrl}?page=${page}`,
  GET_PRODUCT_LIST_PER_PAGE_BY_CATEGORY_PATH_URL: (pathUrl, page) =>
    `/category/${pathUrl}/products?page=${page}`,
  GET_CONTENT_LIST_BY_PRODUCT_TYPE_URL: (categoryUrl, productTypeUrl, page) =>
    `/category/${categoryUrl}/product-type/${productTypeUrl}?page=${page}`,
  GET_PRODUCT_LIST_PER_PAGE_BY_PRODUCT_TYPE_PATH_URL: (
    categoryUrl,
    productTypeUrl,
    page
  ) =>
    `/category/${categoryUrl}/product-type/${productTypeUrl}/products?page=${page}`,
  GET_CONTENT_LIST_BY_MANUFACTOR_PATH_URL: (pathUrl, page) =>
    `/manufactor/${pathUrl}/product-list?page=${page}`,
  GET_PRODUCT_LIST_PER_PAGE_BY_MANUFACTOR_PATH_URL: (pathUrl, page) =>
    `/manufactor/${pathUrl}/product-list/products?page=${page}`,
};
