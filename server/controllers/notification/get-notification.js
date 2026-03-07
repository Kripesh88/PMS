const getNotificationServices = require('../../services/notification/get-notification');
const http = require('http-status');
module.exports = async (req, res, next) => {
  try {
    const notification = await getNotificationServices({
      user: req.user,
    });
    res.status(http.status.OK).json({
      message: 'success',
      data: notification,
    });
  } catch (err) {
    next(err);
  }
};
