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
  GET_LIST_PRODUCT_TYPE__BY_CATEGORYID: (id) => `/category/${id}/product-type`,
};
