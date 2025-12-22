const userRegisterService = require('../../../services/user/authentication/register');
const http = require('http-status');

module.exports = async (req, res, next) => {
  try {
    const user = await userRegisterService({
      ...req.body,
    });

    res.status(http.status.OK).json({
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    console.error('Error in user register controller:', error);
    next(error);
  }
};
