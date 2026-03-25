const refundService = require('../../services/payment/refund-payment');
const http = require('http-status');
module.exports = async (req, res, next) => {
  try {
    const response = await refundService({
      orderId: req.params.orderId,
      user: req.user,
    });

    res.status(http.status.OK).json({
      success: true,
      message: 'Payment refunded successfully',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
