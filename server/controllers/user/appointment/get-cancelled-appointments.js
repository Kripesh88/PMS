const getCancelledAppointmentsServices = require('../../../services/user/appointment/get-cancelled-appointments');
const http = require('http-status');

module.exports = async (req, res, next) => {
  try {
    const cancelledAppointment = await getCancelledAppointmentsServices({
      user: req.user,
    });
    res.status(http.status.OK).json({
      message: 'success',
      data: cancelledAppointment,
    });
  } catch (err) {
    next(err);
  }
};
