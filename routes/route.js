const express = require("express");
const { body } = require("express-validator");
const isAuth = require("../middleware/is-auth");
const User = require("../models/user");
const userController = require("../controllers/userController");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("fullName").trim().not().isEmpty()
  ],
  userController.signup
);

router.post("/login", userController.signin);

module.exports = router;
