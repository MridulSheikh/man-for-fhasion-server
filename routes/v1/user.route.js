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
.patch(usertController.makeAdmin)

router
.route("/admin")
.get()

router
.route("/admin/:email")
.patch(usertController.removeAdmin)

router
.route("/getOne/:email")
.get(usertController.getOneSearchUser)

module.exports = router;