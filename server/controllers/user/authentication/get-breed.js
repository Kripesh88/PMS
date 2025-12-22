const getBreedsService = require('../../../services/user/authentication/get-breed');
const http = require('http-status');

module.exports = async (req, res, next) => {
  try {
    const data = await getBreedsService();

    res.status(http.status.OK).json({
      message: 'success',
      data,
    });
  } catch (error) {
    next(error);
  }
};
