const express = require('express');
const router = express.Router();
const confirmAppointmentController = require('../../controllers/groomer');

// Groomer

// Appointment routes

router.route('/:groomerId/appointment/:appointmentId/status').patch(confirmAppointmentController.confirmAppointment);

module.exports = router;
