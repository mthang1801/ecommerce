const express = require("express");
const adminController = require("../controllers/admin");
const { isAdmin } = require("../middlewares/auth");
const router = express.Router();
//Portfolio
router.post("/portfolio", isAdmin, adminController.postPortfolio);
router.get("/portfolio", isAdmin, adminController.getPortfolio);
router.put("/portfolio", isAdmin, adminController.editPortfolio);
router.delete("/portfolio", isAdmin, adminController.removePortfolio);
//Category
router.post("/category", isAdmin, adminController.postCreateCategory);
router.get("/category", isAdmin, adminController.getCategory);
router.put("/category", isAdmin, adminController.putEditCategory);
router.delete("/category", isAdmin, adminController.removeCategory);
// router.post("/category", adminController.postCategory);
// router.put("/category", adminController.putCategory);
// router.delete("/category", adminController.deleteCategory);
// router.post("/product-types", adminController.postAddProductTypes);
// router.put("/product-types", adminController.putEditProductTypes);
// router.delete("/product-types", adminController.deleteProductTypes);
// router.post("/manufactor", adminController.updateManufactor);
// router.get("/menu", adminController.getMenu);
// router.post("/menu", adminController.postCreateMenu);
// router.get("/product-list", adminController.getProductList);
// router.put("/product-list", adminController.updateProductList);
// router.post("/update-file-images", adminController.updateFileImages);
module.exports = router;
