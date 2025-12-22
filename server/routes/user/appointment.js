const express = require('express');
const router = express.Router();
const userAppointmentController = require('../../controllers/user/appointment');

// USER

// Appointment routes

router.route('/:userId/create').post(userAppointmentController.createAppointment);

module.exports = router;
