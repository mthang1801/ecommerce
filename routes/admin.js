const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

router.post("/category", adminController.postCategory);
router.put("/category", adminController.putCategory);
router.delete("/category", adminController.deleteCategory);
router.post("/product-types", adminController.postAddProductTypes);
router.put("/product-types", adminController.putEditProductTypes);
router.delete("/product-types", adminController.deleteProductTypes);
router.post("/products", adminController.postAddProducts);
router.put("/products", adminController.putEditProduct);
router.delete("/products", adminController.deleteProduct);
module.exports = router;
