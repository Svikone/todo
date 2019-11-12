const express = require("express");
const Controller = require("../controller/user");
const mw_auth = require("../middleware/auth")

const Router = express.Router()

Router.post("/create",  Controller.createUser);
Router.post("/signin", Controller.signin);
Router.post("/verify", mw_auth, Controller.verify);
Router.post("/get/one", mw_auth, Controller.getUser);
Router.post("/profil/edit", mw_auth, Controller.editProfil);
Router.post("/password/edit", mw_auth, Controller.editPassword);



module.exports = Router;