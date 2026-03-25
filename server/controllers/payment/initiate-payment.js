const initiateKhaltiService = require('../../services/payment/initiate-payment');
const http = require('http-status');

module.exports = async (req, res, next) => {
  try {
    const result = await initiateKhaltiService({
      user: req.user,
      amount: req.body.amount,
      appointmentId: req.params.appointmentId,
      method:req.body.method,
    });

    res.status(http.status.OK).json({
      success: true,
      message: 'Khalti payment initiated',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
