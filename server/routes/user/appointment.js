const express = require('express');
const router = express.Router();
const userAppointmentController = require('../../controllers/user/appointment');
const authMiddleware = require('../../middleware/auth-middleware');

// USER

// Appointment routes

router.route('/:id/create').post(authMiddleware, userAppointmentController.createAppointment);
router
  .route('/:userId/upcoming')
  .get(authMiddleware, userAppointmentController.getUpcomingAppointments);
router
  .route('/:userId/completed')
  .get(authMiddleware, userAppointmentController.getCompletedAppointments);
router
  .route('/:userId/cancelled')
  .get(authMiddleware, userAppointmentController.getCancelledAppointments);

module.exports = router;
