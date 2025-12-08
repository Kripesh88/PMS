const userRegisterService = require('../../services/user/register');
const http = require('http-status');

module.exports = async (req, res, next) => {
  try {
    const user = await userRegisterService({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
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
