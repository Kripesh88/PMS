const express = require('express');
const router = new express.Router();
const notificationRoute = require('./notification');

router.use('/notification', notificationRoute);

module.exports = router;
