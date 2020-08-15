const express = require("express");
const shopController = require("../controllers/shop");
const router = express.Router();

router.get("/category", shopController.getCategoryList);
router.get("/product-types", shopController.getProductTypes);
router.get("/product-types/:id", shopController.getProductTypesById);
router.get(
  "/list-links-product-types",
  shopController.getListLinksProductTypes
);
router.get("/products", shopController.getProducts);
router.get("/products/:id", shopController.getProductById);
module.exports = router;
