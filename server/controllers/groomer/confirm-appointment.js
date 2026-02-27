const confirmAppointmentServices = require('../../services/groomer/confirm-appointment');
const http = require('http-status');

module.exports = async (req, res, next) => {
  try {
    const confirmAppointment = await confirmAppointmentServices({
      appointmentId: Number(req.params.appointmentId),
      user: req.user,
      status: req.body.status,
      time: req.body.time,
      appointmentDate: req.body.appointmentDate,
    });
    res.status(http.status.OK).json({
      success: true,
      message: 'Status updated by Groomer',
      data: confirmAppointment,
    });
  } catch (err) {
    next(err);
  }
};
