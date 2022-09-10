const express = require("express");
const userController = require("../controllers/user");
const route = express.Router();

route.get("/user", userController.getUser);
route.post("/user/signup", userController.postUser);
route.get("/sign", userController.logNew);
route.post("/user/login", userController.logUser);
route.get("/user/upload", userController.getLoad);
route.post("/user/upload", userController.postImage);

module.exports = route;
