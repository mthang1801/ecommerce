export const api = {
  //Portfolio
  SEARCH_PORFOLIO : search => `/search/portfolio?search=${search}`,
  POST_ADD_NEW_PORTFOLIO : "/admin/portfolio",
  FETCH_ADMIN_PORTFOLIOS : "/admin/portfolio",
  EDIT_PORTFOLIO : "/admin/portfolio",
  REMOVE_PORTFOLIO : "/admin/portfolio",
  //Category
  POST_ADD_NEW_CATEGORY : "/admin/category",
  FETCH_ADDMIN_CATEGORIES : "/admin/category",
  EDIT_ADMIN_CATEGORY : "/admin/category",
  REMOVE_ADMIN_CATEGORY : "/admin/category",
  SEARCH_CATEGORY : search => `/search/category?search=${search}`
}