const express = require("express");
const usertController = require("../../controllers/user.controller");
const router = express.Router();

router
.route("/")
.post(usertController.postUser)
.get(usertController.getUser)

router
.route("/:email")
.get(usertController.getOneUser)

module.exports = router;