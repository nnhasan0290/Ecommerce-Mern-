const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticated, isAuthorizeRoles } = require("../middleware/auth");
const router = express.Router();
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticated, getUserDetails);

router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/me/update").put(isAuthenticated, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticated, isAuthorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, isAuthorizeRoles("admin"), getSingleUser)
  .put(isAuthenticated, isAuthorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticated, isAuthorizeRoles("admin"), deleteUser);

module.exports = router;
