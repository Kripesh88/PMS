const listAppointmentServices = require('../../services/vet/list-appointments');
const http = require('http-status');
module.exports = async (req, res, next) => {
  try {
    const appointments = await listAppointmentServices({
      user: req.user,
    });

    res.status(http.status.OK).json({
      success: true,
      message: 'success',
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};
