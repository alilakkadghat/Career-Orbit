const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateBody, validateEmail } = require("../middleware/validateRequest");

// @route   POST /api/auth/register
router.post(
  "/register",
  validateBody(["username", "email", "password"]),
  validateEmail,
  authController.register
);

// @route   POST /api/auth/login
router.post(
  "/login",
  validateBody(["email", "password"]),
  validateEmail,
  authController.login
);

module.exports = router;
