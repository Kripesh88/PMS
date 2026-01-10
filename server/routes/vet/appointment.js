const express = require('express');
const router = express.Router();
const confirmAppointmentController = require('../../controllers/vet');

// Vet

// Appointment routes

router
  .route('/:vetId/appointment/:appointmentId/status')
  .patch(confirmAppointmentController.confirmAppointment);

module.exports = router;
