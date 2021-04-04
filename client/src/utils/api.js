export const api = {
  //Portfolio
  SEARCH_PORFOLIO : search => `/search/portfolio?search=${search}`,
  POST_ADD_NEW_PORTFOLIO : "/admin/portfolio",
  FETCH_ADMIN_PORTFOLIOS : "/portfolio",
  EDIT_PORTFOLIO : "/admin/portfolio",
  REMOVE_PORTFOLIO : "/admin/portfolio",
  //Category
  POST_ADD_NEW_CATEGORY : "/admin/category",
  FETCH_ADDMIN_CATEGORIES : "/category",
  EDIT_ADMIN_CATEGORY : "/admin/category",
  REMOVE_ADMIN_CATEGORY : "/admin/category",
  SEARCH_CATEGORY : search => `/search/category?search=${search}`,
  FETCH_CATEGORIES_BY_PORTFOLIO : (portfolioId) => `/portfolio/${portfolioId}/categories`,
  //ProductGroup
  POST_ADD_NEW_PRODUCT_GROUP : "/admin/product-group",
  FETCH_ADMIN_PRODUCT_GROUPS : "/product-group",
  EDIT_ADMIN_PRODUCT_GROUP : "/admin/product-group",
  REMOVE_ADMIN_PRODUCT_GROUP : "/admin/product-group",
  SEARCH_PRODUCT_GROUP : (search) => `/search/product-group?search=${search}`,
  FETCH_PRODUCT_GROUPS_BY_CATEGORY : categoryId => `/category/${categoryId}/product-groups`,
  //Post Product
  POST_PRODUCT : "/product",
  //Home page
  GET_HOME_CONTENT_LIST : "/home"
}