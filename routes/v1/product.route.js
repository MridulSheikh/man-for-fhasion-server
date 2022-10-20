const express = require("express");
const productController = require("../../controllers/product.controller.js");
const router = express.Router();

router
.route("/")
.get( productController.getProduct)
.post(productController.insertOneProduct)

router
.route("/:id")
.delete(productController.deleteOneProduct)

router
.route("/findone")
.get(productController.getOneProduct)

module.exports = router;