const express = require('express');
const router = new express.Router();
const paymentRoute = require('./payment');

router.use('/payment', paymentRoute);

module.exports = router;
