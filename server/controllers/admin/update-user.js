const updateUserService = require('../../services/admin/update-users');
const http = require('http-status');
module.exports = async (req, res, next) => {
  try {
    const updatedUser = await updateUserService({
      user: req.user,
      body: req.body,
      userId: req.params.id,
    });

    res.status(http.status.OK).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
