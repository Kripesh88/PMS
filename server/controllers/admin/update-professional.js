const updateProfessionalServices = require('../../services/admin/update-professional');
const http = require('http-status');
module.exports = async (req, res, next) => {
  try {
    const professionals = await updateProfessionalServices({
      user: req.user,
      body: req.body,
      professionalId: req.params.id,
    });
    res.status(http.status.OK).json({
      success: true,
      message: 'Professional updated successfully',
      data: professionals,
    });
  } catch (error) {
    next(error);
  }
};
