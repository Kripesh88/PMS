const listProfessionalsService = require('../../services/admin/list-professional');
const http = require('http-status');

module.exports = async (req, res, next) => {
  try {
    const professionals = await listProfessionalsService({
      user: req.user,
      query: req.query,
    });

    res.status(http.status.OK).json({
      message: 'Professionals fetched successfully',
      data: professionals,
    });
  } catch (error) {
    next(error);
  }
};
