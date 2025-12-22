const createAppointmentService = require('../../../services/user/appointment/create-appointment');
const httpStatus = require('http-status');

module.exports = async (req, res, next) => {
  try {
    const appointment = await createAppointmentService({
      ...req.body,
      userId: req.user.id,
    });

    res.status(httpStatus.CREATED).json({
      message: 'Appointment created successfully',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};
