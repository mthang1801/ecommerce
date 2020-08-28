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
 * @route GET /menu
 * @desc get menu
 * @access public
 */
router.get("/menu", shopController.getMenu);
/**
 * @route POST /menu
 * @desc get menu
 * @access public
 */
router.post("/menu", shopController.postCreateMenu);
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
module.exports = router;
