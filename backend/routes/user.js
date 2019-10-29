const express = require("express");
const Controller = require("../controller/user");
const mw_auth = require("../middleware/auth")

const Router = express.Router();

Router.post("/create", Controller.createUser);
Router.post("/signin", Controller.signin);
Router.post("/verify", mw_auth, Controller.verify);


module.exports = Router;