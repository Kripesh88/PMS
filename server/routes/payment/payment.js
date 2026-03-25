const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/payment');
const authMiddleware = require('../../middleware/auth-middleware');
const roleMiddleware = require('../../middleware/role-middleware');

// Notification routes

router
  .route('/khalti/:appointmentId/initiate')
  .post(authMiddleware, paymentController.initiatePayment);
router.route('/khalti/verify').get(paymentController.verifyPayment);
router
  .route('/khalti/:orderId/refund')
  .post(authMiddleware, roleMiddleware(['Admin']), paymentController.refundPayment);

module.exports = router;
