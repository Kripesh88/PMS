const markAsReadServices = require('../../services/notification/mark-as-read');
const http = require('http-status');
module.exports = async (req, res, next) => {
  try {
    const notification = await markAsReadServices(req.params.id, req.user.id);
    res.status(http.status.OK).json({
      message: 'success',
      data: notification,
    });
  } catch (err) {
    next(err);
  }
};
