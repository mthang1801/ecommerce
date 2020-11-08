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
  GET_HOME_CONTENT_LIST: "/home",
  GET_LATEST_PRODUCTS: "/latest-products",
  GET_BEST_SELLER_PRODUCTS: "/best-seller-products",
  GET_TOP_RATED_PRODUCTS: "/top-rated-products",
  GET_CATEGORY_LIST: "/category",
  GET_CONTENT_LIST_BY_CATEGORY_PATH_URL: (
    categoryId,
    min_price,
    max_price,
    page
  ) =>
    `/category/${categoryId}?page=${page}&min_price=${min_price}&max_price=${max_price}`, //gotten
  GET_CONTENT_LIST_BY_PRODUCT_TYPE_URL: (
    productTypeId,
    min_price,
    max_price,
    page
  ) =>
    `/product-type/${productTypeId}?page=${page}&min_price=${min_price}&max_price=${max_price}`, // gotten
  GET_PRODUCT_LIST_PER_PAGE_BY_PRODUCT_TYPE_PATH_URL: (
    categoryPath,
    productTypePath,
    page
  ) =>
    `/category/${categoryPath}/product-type/${productTypePath}/products?page=${page}`,
  GET_CONTENT_LIST_BY_MANUFACTOR_PATH_URL: (pathUrl, page) =>
    `/manufactor/${pathUrl}/product-list?page=${page}`,
  GET_PRODUCT_LIST_PER_PAGE_BY_MANUFACTOR_PATH_URL: (pathUrl, page) =>
    `/manufactor/${pathUrl}/product-list/products?page=${page}`,
  GET_CONTENT_LIST_BY_PRODUCT_GROUP_PATH_URL: (
    productGroupId,
    min_price,
    max_price,
    page
  ) =>
    `/product-group/${productGroupId}?page=${page}&min_price=${min_price}&max_price=${max_price}`,
  GET_PRODUCT_LIST_PER_PAGE_BY_PRODUCT_GROUP_PATH_URL: (
    categoryPath,
    productTypePath,
    productGroupPath,
    page
  ) =>
    `/${categoryPath}/${productTypePath}/product-group/${productGroupPath}/products?page=${page}`,
  GET_CONTENT_PRODUCT_DETAIL_BY_PRODUCT_PATH_URL: (
    categoryPath,
    productTypePath,
    productPath
  ) => `/product-detail/${categoryPath}/${productTypePath}/${productPath}`,
  UPDATE_USER_INFO: `/user/update-information`,
  POST_COD_PAYMENT: `/user/payment/cod`,
  POST_CARD_PAYMENT: `/user/payment/card`,
  FETCH_ORDERED_LIST: `/ordered`,
  GET_PRODUCT_REVIEWS: (productId) => `/product-detail/reviews/${productId}`,
  POST_REVIEWS_PRODUCT: (productId) => `/product-detail/reviews/${productId}`,
  UPDATE_REVIEWS_PRODUCT: (productId) => `/product-detail/reviews/${productId}`,
  GET_PRODUCT_COMMENT_REVIEWS: (productId) =>
    `/product-detail/reviews/${productId}/comments`,
  POST_LIKE_OR_UNLIKE_COMMENT: (commentId) =>
    `/product-detail/comment/${commentId}/like`,
  POST_DISLIKE_OR_UNDISLIKE_COMMENT: (commentId) =>
    `/product-detail/comment/${commentId}/dislike`,
  POST_RESPONSE_COMMENT: (commentId) =>
    `/product-detail/comment/${commentId}/response`,
  POST_LIKE_OR_UNLIKE_RESPONSE_COMMENT: (responseId) =>
    `/product-detail/comment/response/${responseId}/like`,
  POST_DISLIKE_OR_UNDISLIKE_RESPONSE_COMMENT: (responseId) =>
    `/product-detail/comment/response/${responseId}/dislike`,
  POST_RESPONSE_TO_REPONSE_COMMENT: (commentId) =>
    `/product-detail/comment/${commentId}/response/`,
  READ_MORE_RESPONSES: (commentId, skip) =>
    `/product-detail/comment/${commentId}/response/readmore?skip=${skip}`,
  GET_MORE_COMMENTS: (productId, skip) =>
    `/product-detail/${productId}/comments/readmore?skip=${skip}`,
  GET_PRODUCT_LIST_BY_FILTER_PRICE_IN_MANUFACTOR: (
    manufactorPath,
    minPrice,
    maxPrice,
    page
  ) =>
    `/manufactor/${manufactorPath}/product-list/products/query?min_price=${minPrice}&max_price=${maxPrice}&page=${page}`,

  ADD_OR_REMOVE_FAVORITE_PRODUCT: (productId) =>
    `/product-detail/${productId}/favorite`,
  SEARCH_PRODUCT_LIST: "/search",
};
