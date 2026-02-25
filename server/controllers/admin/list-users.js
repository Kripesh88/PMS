const listUsersService = require('../../services/admin/list-users');
const http = require('http-status');
module.exports = async (req, res, next) => {
  try {
    const users = await listUsersService({
      user: req.user,
      query: req.query,
    });

    res.status(http.status.OK).json({
      success: true,
      message:'sucess',
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
