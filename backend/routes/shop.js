const express = require("express");
const shopController = require("../controllers/shop");
const { isAuth } = require("../middlewares/auth");
const router = express.Router();

//Search
router.get("/search/portfolio", shopController.searchPortfolio );
router.get("/search/category", shopController.searchCategory);
router.get("/search/product-group", shopController.searchProductGroup);
//Portfolio
router.get("/portfolio", shopController.getPortfolio);
//Category
router.get("/category", shopController.getCategory);
router.get("/portfolio/:portfolioId/categories", shopController.getCategoriesByPortfolio);
//Manufactors
router.get("/portfolio/:portfolioId/manufactors", shopController.getManufactorsByPortfolio)
//Product Group
router.get("/product-group", shopController.getProductGroup);
router.get("/category/:categoryId/product-groups", shopController.getProductGroupsByCategory);
//Product
router.post("/product" ,isAuth, shopController.postProduct);
//Home page
router.get("/home", shopController.getHome);

// /**
//  * @route GET /initial-data
//  * @desc get initial data
//  * @access public
//  */
// router.get("/initial-data", shopController.getInitialData);
// /**
//  * @route GET /home
//  * @desc get  data at home page
//  * @access public
//  */
// router.get("/home", shopController.getHomeContentList);
// /**
//  * @route GET /api/category
//  * @desc get list categories
//  * @access public
//  */
// router.get("/category", shopController.getCategoryList);
// /**
//  * @route GET /category/:categoryPath?page=
//  * @desc get list content by category path
//  * @access public
//  */
// router.get(
//   "/category/:categoryId",
//   shopController.getContentListByCategoryLinkUrl
// );
// /**
//  * @route GET /category/:id/product-type
//  * @desc get list product types by category id
//  * @access public
//  */
// router.get(
//   "/category/:id/product-type",
//   shopController.getListProductTypesByCategoryId
// );

// /**
//  * @route GET /product-type/:id/product-group
//  * @desc get list product group by productType ID
//  * @access public
//  */
// router.get(
//   "/product-type/:id/product-group",
//   shopController.getListProductGroupByProducTypeId
// );
// /**
//  * @route GET /produc-types
//  * @desc get list product types
//  * @access public
//  */
// router.get("/product-types", shopController.getProductTypes);
// /**
//  * @route GET /produc-types/all
//  * @desc get all list product types
//  * @access public
//  */
// router.get("/product-types/:id", shopController.getProductTypesById);
// /**
//  * @route GET /list-links-product-types
//  * @desc get list product types by linkUrl
//  * @access public
//  */
// router.get(
//   "/list-links-product-types",
//   shopController.getListLinksProductTypes
// );

// /**
//  * @route POST /product
//  * @desc create product
//  * @access private
//  */
// router.post("/product", isAuth, shopController.postCreateProduct);
// /**
//  * @route GET /latest-products
//  * @desc get Latest products to render home page
//  * @access public
//  */
// router.get("/latest-products", shopController.getLatestProducts);
// /**
//  * @route GET /best-seller-products
//  * @desc get Best Seller products to render home page
//  * @access public
//  */
// router.get("/best-seller-products", shopController.getBestSellerProducts);
// /**
//  * @route GET /top-rated-products
//  * @desc get Top Rated products to render home page
//  * @access public
//  */
// router.get("/top-rated-products", shopController.getTopRatedProducts);
// /**
//  * @route GET /category/:linkUrl/products
//  * @desc get product List per page by category Link
//  * @access public
//  */
// router.get(
//   "/category/:linkUrl/products",
//   shopController.getProductListPerPageByCategoryLink
// );
// /**
//  * @route GET /product-type/:productTypeId
//  * @desc get list content by categoryUrl, productTypeUrl
//  * @access public
//  */
// router.get(
//   "/product-type/:productTypeId",
//   shopController.getListContentByProductTypeUrl
// );

// /**
//  * @route GET /manufactor/:manufactorPath/product-list
//  * @desc get list content by manufactorUrl
//  * @access public
//  */
// router.get(
//   "/manufactor/:manufactorPath/product-list",
//   shopController.getListContentByManufactorUrl
// );
// /**
//  * @route GET /manufactor/:manufactorPath/product-list/products
//  * @desc get list products per page by manufactorUrl
//  * @access public
//  */
// router.get(
//   "/manufactor/:manufactorPath/product-list/products",
//   shopController.getListProdudctPerPageByManufactorUrl
// );
// /**
//  * @route GET /manufactor/:manufactorPath/product-list/products
//  * @desc get list products per page by manufactorUrl
//  * @access public
//  */
// router.get(
//   "/manufactor/:manufactorPath/product-list/products/query",
//   shopController.getProductListInManufactorByFilterPrice
// );
// /**
//  * @route GET /product-group/:productGroupId
//  * @desc get list content product group
//  * @access public
//  */
// router.get(
//   "/product-group/:productGroupId",
//   shopController.getListContentProductGroup
// );
// /**
//  * @route GET /:categoryPath/:productTypePath/product-group/:productGroupPath:/products/query
//  * @desc get product list by filter price
//  * @access public
//  */
// router.get(
//   "/:categoryPath/:productTypePath/product-group/:productGroupPath/products/query",
//   shopController.getProductListInProductGroupByFilterPrice
// );
// /**
//  * @route GET /:categoryPath/:productTypePath/product-group/:productGroupPath/products
//  * @desc get list product group per page
//  * @access public
//  */
// router.get(
//   "/:categoryPath/:productTypePath/product-group/:productGroupPath/products",
//   shopController.getListProductGroupPerPageByProductGroupUrl
// );
// /**
//  * @route GET /product-detail/reviews/:productId/comment
//  * @desc get comments review by product Id
//  * @access public
//  */
// router.get(
//   "/product-detail/reviews/:productId/comments",
//   shopController.getCommentReviewsByProductId
// );
// /**
//  * @route GET /product-detail/reviews/:productId
//  * @desc get product review by id
//  * @access private
//  */
// router.get(
//   "/product-detail/reviews/:productId",
//   isAuth,
//   shopController.getProductReviewsById
// );
// /**
//  * @route POST /product-detail/reviews/:productId
//  * @desc post product review by id
//  * @access private
//  */
// router.post(
//   "/product-detail/reviews/:productId",
//   isAuth,
//   shopController.postProductReviewsById
// );
// /**
//  * @route PUT /product-detail/reviews/:productId
//  * @desc update product review by id
//  * @access private
//  */
// router.put(
//   "/product-detail/reviews/:productId",
//   isAuth,
//   shopController.updateProductReviewById
// );
// /**
//  * @route POST /product-detail/comment/:commentId/like
//  * @desc like comment
//  * @access private
//  */
// router.post(
//   "/product-detail/comment/:commentId/like",
//   isAuth,
//   shopController.postLikeOrUnlikeComment
// );
// /**
//  * @route POST /product-detail/comment/:commentId/dislike
//  * @desc like comment
//  * @access private
//  */
// router.post(
//   "/product-detail/comment/:commentId/dislike",
//   isAuth,
//   shopController.postDislikeOrUndislikeComment
// );
// /**
//  * @route POST /product-detail/comment/response/:responseId/like
//  * @desc like comment
//  * @access private
//  */
// router.post(
//   "/product-detail/comment/response/:responseId/like",
//   isAuth,
//   shopController.postLikeOrUnlikeResponseComment
// );
// /**
//  * @route POST /product-detail/comment/response/:responseId/dislike
//  * @desc like comment
//  * @access private
//  */
// router.post(
//   "/product-detail/comment/response/:responseId/dislike",
//   isAuth,
//   shopController.postDislikeOrUndislikeResponseComment
// );
// /**
//  * @route POST /product-detail/comment/response/:responseId/response
//  * @desc like comment
//  * @access private
//  */
// router.post(
//   "/product-detail/comment/:commentId/response/",
//   isAuth,
//   shopController.postReponseToResponsecomment
// );
// /**
//  * @route GET /product-detail/comment/response/:responseId/response
//  * @desc read more responses by comment id
//  * @access public
//  */
// router.get(
//   "/product-detail/comment/:commentId/response/readmore",
//   shopController.getReadmoreResponsesComment
// );
// /**
//  * @route GET /product-detail/:productId/comments/readmore
//  * @desc read more comment by productId
//  * @access public
//  */
// router.get(
//   "/product-detail/:productId/comments/readmore",
//   shopController.readMoreComments
// );
// /**
//  * @route GET /product-detail/productId
//  * @desc get content product by productUrl
//  * @access public
//  */
// router.get(
//   "/product-detail/:productId",
//   shopController.getContentProductByProductUrl
// );
// /**
//  * @route POST /product-detail/:productId/favorite
//  * @desc add or remove favorite product
//  * @access public
//  */
// router.post(
//   "/product-detail/:productId/favorite",
//   isAuth,
//   shopController.addOrRemoveFavoriteProduct
// );
// /**
//  * @route GET /search
//  * @desc search products
//  * @access public
//  */
// router.get("/search", shopController.searchProducts);
module.exports = router;
