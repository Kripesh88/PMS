const rescheduleAppointmentService = require('../../../services/user/appointment/reschedule-appointment');
const http = require('http-status');
module.exports = async (req, res, next) => {
  try {
    const appointment = await rescheduleAppointmentService({
      user: req.user,
      appointmentId: req.params.id,
      ...req.body,
    });
    res.status(http.status.OK).json({
      success: true,
      message: 'Appointment rescheduled successfully',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};
