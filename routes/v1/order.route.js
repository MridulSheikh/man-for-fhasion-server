const express = require('express');
const payemntController = require('./../../controllers/payment.contorller');
const router = express.Router();

router
.route("/")
.post(payemntController.saveOrder)

module.exports = router;