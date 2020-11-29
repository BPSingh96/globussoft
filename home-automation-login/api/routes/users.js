const express = require("express");
const {user_login_controller,user_register_controller} =  require("../controlers/users");
const userRotes = express.Router();
const {userLoginValidation, registerUserValidation } = require("../middleware/param-validation");
userRotes.post("/add", registerUserValidation, user_register_controller);
userRotes.post("/login" , userLoginValidation, user_login_controller);

module.exports = userRotes;
