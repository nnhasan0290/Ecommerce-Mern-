const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProducts,
  getProductDetails,
} = require("../controllers/productController");
const { isAuthorizeRoles, isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/products/admin/new")
  .post(isAuthenticated, isAuthorizeRoles("admin"), createProduct);
router
  .route("/admin/products/:id")
  .put(isAuthenticated, isAuthorizeRoles("admin"), updateProducts)
  .delete(isAuthenticated, isAuthorizeRoles("admin"), deleteProducts);

router.route("/product/:id").get(getProductDetails);

module.exports = router;
