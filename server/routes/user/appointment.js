const express = require('express');
const router = express.Router();
const userAppointmentController = require('../../controllers/user/appointment');

// USER

// Appointment routes

router.route('/:userId/create').post(userAppointmentController.createAppointment);
router.route('/:userId/upcoming').get(userAppointmentController.getUpcomingAppointments);
 router.route('/:userId/completed').get(userAppointmentController.getCompletedAppointments);
 router.route('/:userId/cancelled').get(userAppointmentController.getCancelledAppointments);



module.exports = router;
