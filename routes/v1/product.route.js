const express = require("express");
const productController = require("../../controllers/product.controller.js");
const router = express.Router();

router
.route("/")
.get( productController.getProduct)

router
.route("/findone")
.get(productController.getOneProduct)

module.exports = router;