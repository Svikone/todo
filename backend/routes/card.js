const express = require("express");
const mw_auth = require("../middleware/auth")
const Controller = require("../controller/card");
const Router = express.Router();

Router.post("/create", mw_auth, Controller.create);
Router.post("/get/all", mw_auth, Controller.getAll);
Router.post("/remove", mw_auth, Controller.remove);
Router.post("/get/one", mw_auth, Controller.getOne);
Router.post("/edit", mw_auth, Controller.edit);
Router.post("/set/state", mw_auth, Controller.setState);

module.exports = Router;