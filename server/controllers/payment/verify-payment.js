const verifyKhaltiService = require('../../services/payment/verify-payment');
const http = require('http-status');

module.exports = async (req, res, next) => {
  try {
    const result = await verifyKhaltiService({
      pidx: req.query.pidx,
    });

    res.status(http.status.OK).json({
      success: true,
      message: 'Payment verified',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
