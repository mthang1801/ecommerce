const express = require("express");
const shopController = require("../controllers/shop");
const { isAuth } = require("../middlewares/auth");
const router = express.Router();
/**
 * @route GET /initial-data
 * @desc get initial data
 * @access public
 */
router.get("/initial-data", shopController.getInitialData);
/**
 * @route GET /api/category
 * @desc get list categories
 * @access public
 */
router.get("/category", shopController.getCategoryList);
/**
 * @route GET /category/:pathUrl?page=
 * @desc get list content by category path
 * @access public
 */
router.get(
  "/category/:pathUrl",
  shopController.getContentListByCategoryLinkUrl
);
/**
 * @route GET /product/reviews/:productId
 * @desc get product review by id
 * @access private
 */
router.get(
  "/product/reviews/:productId",
  isAuth,
  shopController.getProductReviewsById
);
/**
 * @route POST /product/reviews/:productId
 * @desc post product review by id
 * @access private
 */
router.post(
  "/product/reviews/:productId",
  isAuth,
  shopController.postProductReviewsById
);
/**
 * @route PUT /product/reviews/:productId
 * @desc update product review by id
 * @access private
 */
router.put(
  "/product/reviews/:productId",
  isAuth,
  shopController.updateProductReviewById
);
/**
 * @route GET /product/reviews/:productId/comment
 * @desc get comments review by product Id
 * @access public
 */
router.get(
  "/product/reviews/:productId/comments",
  shopController.getCommentReviewsByProductId
);
/**
 * @route GET /category/:id/product-type
 * @desc get list product types by category id
 * @access public
 */
router.get(
  "/category/:id/product-type",
  shopController.getListProductTypesByCategoryId
);
/**
 * @route GET /product-type/:id/product-group
 * @desc get list product group by productType ID
 * @access public
 */
router.get(
  "/product-type/:id/product-group",
  shopController.getListProductGroupByProducTypeId
);
/**
 * @route GET /produc-types
 * @desc get list product types
 * @access public
 */
router.get("/product-types", shopController.getProductTypes);
/**
 * @route GET /produc-types/all
 * @desc get all list product types
 * @access public
 */
router.get("/product-types/:id", shopController.getProductTypesById);
/**
 * @route GET /list-links-product-types
 * @desc get list product types by linkUrl
 * @access public
 */
router.get(
  "/list-links-product-types",
  shopController.getListLinksProductTypes
);

/**
 * @route POST /product
 * @desc create product
 * @access private
 */
router.post("/product", isAuth, shopController.postCreateProduct);
/**
 * @route GET /latest-products
 * @desc get Latest products to render home page
 * @access public
 */
router.get("/latest-products", shopController.getLatestProducts);
/**
 * @route GET /best-seller-products
 * @desc get Best Seller products to render home page
 * @access public
 */
router.get("/best-seller-products", shopController.getBestSellerProducts);
/**
 * @route GET /top-rated-products
 * @desc get Top Rated products to render home page
 * @access public
 */
router.get("/top-rated-products", shopController.getTopRatedProducts);
/**
 * @route GET /:categoryLink/products
 * @desc get product List per page by category Link
 * @access public
 */
router.get(
  "/category/:linkUrl/products",
  shopController.getProductListPerPageByCategoryLink
);
/**
 * @route GET /category/:categoryPath/product-type/:productTypePath/
 * @desc get list content by categoryUrl, productTypeUrl
 * @access public
 */
router.get(
  "/category/:categoryPath/product-type/:productTypePath",
  shopController.getListContentByProductTypeUrl
);
/**
 * @route GET /category/:categoryPath/product-type/:productTypePath/
 * @desc get list product by categoryUrl, productTypeUrl
 * @access public
 */
router.get(
  "/category/:categoryPath/product-type/:productTypePath/products",
  shopController.getProductListWithSpecificPageByProductTypeUrl
);
/**
 * @route GET /manufactor/:manufactorPath/product-list
 * @desc get list content by manufactorUrl
 * @access public
 */
router.get(
  "/manufactor/:manufactorPath/product-list",
  shopController.getListContentByManufactorUrl
);
/**
 * @route GET /manufactor/:manufactorPath/product-list/products
 * @desc get list products per page by manufactorUrl
 * @access public
 */
router.get(
  "/manufactor/:manufactorPath/product-list/products",
  shopController.getListProdudctPerPageByManufactorUrl
);
/**
 * @route GET /:categoryPath/:productTypePath/product-group/:productGroupPath
 * @desc get list content product group
 * @access public
 */
router.get(
  "/:categoryPath/:productTypePath/product-group/:productGroupPath",
  shopController.getListContentProductGroup
);
/**
 * @route GET /:categoryPath/:productTypePath/product-group/:productGroupPath/products
 * @desc get list product group per page
 * @access public
 */
router.get(
  "/:categoryPath/:productTypePath/product-group/:productGroupPath/products",
  shopController.getListProductGroupPerPageByProductGroupUrl
);
/**
 * @route GET /:categoryPath/:productTypePath/:productPath
 * @desc get content product by productUrl
 * @access public
 */
router.get(
  "/:categoryPath/:productTypePath/:productPath",
  shopController.getContentProductByProductUrl
);

module.exports = router;
