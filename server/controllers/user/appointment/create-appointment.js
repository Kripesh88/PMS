const http = require('http-status');
const createAppointmentService = require('../../../services/user/appointment/create-appointment');

module.exports = async (req, res, next) => {
  try {
    const appointment = await createAppointmentService({
      userId: req.params.userId,        
      ...req.body,
    });

    res.status(http.status.OK).json({
      success: true,
      message: 'Appointment created successfully',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};
