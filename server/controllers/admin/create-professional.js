const createProfessionalServices = require('../../services/admin/create-professional');
const http = require('http-status');

module.exports = async (req, res, next) => {
  try {
    const professionals = await createProfessionalServices({
      user: req.user,
      body: req.body,
    });
    res.status(http.status.OK).json({
      success: true,
      message: 'Professional created successfully',
      data: professionals,
    });
  } catch (err) {
    next(err);
  }
};
