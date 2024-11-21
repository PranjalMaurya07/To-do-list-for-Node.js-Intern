const express = require("express");
const {
  handleUserRegistrationController,
  handleUserLoginController,
  handleUpdatePasswordController,
  handleDeleteUserController,
} = require("../controllers/userController");

const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

// User-registration
router.post("/register", handleUserRegistrationController);

// User-login
router.post("/login", handleUserLoginController);

// Update-password
router.put("/update", handleUpdatePasswordController);

// Delete-user
router.delete("/delete", auth, handleDeleteUserController);

module.exports = router;
