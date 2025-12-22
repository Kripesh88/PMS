const getVetService = require('../../../services/user/vet/get-vet');
const http = require('http-status');

module.exports = async (req, res, next) => {
  try {
    const data = await getVetService();

    res.status(http.status.OK).json({
      message: 'success',
      data,
    });
  } catch (error) {
    next(error);
  }
};
