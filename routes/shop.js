const express = require("express");
const shopController = require("../controllers/shop");
const router = express.Router();
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
router.get("/product-types", shopController.getProductTypes);
router.get("/product-types/:id", shopController.getProductTypesById);
router.get(
  "/list-links-product-types",
  shopController.getListLinksProductTypes
);

module.exports = router;
