const getUnreadCountServices = require('../../services/notification/get-unread-count');
const http = require('http-status');
module.exports = async (req, res, next) => {
  try {
    const notification = await getUnreadCountServices(req.user.id);
    res.status(http.status.OK).json({
      message: 'success',
      data: notification,
    });
  } catch (err) {
    next(err);
  }
};
