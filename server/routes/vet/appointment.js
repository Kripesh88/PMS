const express = require('express');
const router = express.Router();
const confirmAppointmentController = require('../../controllers/vet');
const authMiddleware = require('../../middleware/auth-middleware');
const roleMiddleware = require('../../middleware/role-middleware');
// Vet

// Appointment routes

router
  .route('/:vetId/appointment/:appointmentId/status')
  .patch(authMiddleware,roleMiddleware('Vet'),confirmAppointmentController.confirmAppointment);

module.exports = router;
