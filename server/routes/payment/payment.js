const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/payment');
const authMiddleware = require('../../middleware/auth-middleware');

// Notification routes

router.route('/khalti/:appointmentId/initiate').post(authMiddleware, paymentController.initiatePayment);
router.route('/khalti/verify').get(paymentController.verifyPayment);

module.exports = router;
