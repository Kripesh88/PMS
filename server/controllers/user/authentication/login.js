const userLoginService = require('../../../services/user/authentication/login');
const http = require('http-status');

module.exports = async (req, res, next) => {
  try {
    const userData = await userLoginService({
      email: req.body.email,
      password: req.body.password,
      petId: req.params.petId,
    });
    res.status(http.status.OK).json({
      message: 'success',
      data: userData,
    });
  } catch (error) {
    console.error('Error in user login controller:', error);
    next(error);
  }
};
