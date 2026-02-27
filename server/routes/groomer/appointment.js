const express = require('express');
const router = express.Router();
const confirmAppointmentController = require('../../controllers/groomer');
const authMiddleware = require('../../middleware/auth-middleware');
const roleMiddleware = require('../../middleware/role-middleware');
// Groomer

// Appointment routes

router
  .route('/:id/appointment/:appointmentId/status')
  .patch(
    authMiddleware,
    roleMiddleware('Groomer'),
    confirmAppointmentController.confirmAppointment
  );

router
  .route('/list')
  .get(authMiddleware, roleMiddleware('Groomer'), confirmAppointmentController.listAppointments);

module.exports = router;
