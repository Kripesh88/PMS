const getGroomerService = require('../../../services/user/groomer/get-groomer');
const http = require('http-status');

module.exports = async (req, res, next) => {
  try {
    const data = await getGroomerService();

    res.status(http.status.OK).json({
      message: 'success',
      data,
    });
  } catch (error) {
    next(error);
  }
};
