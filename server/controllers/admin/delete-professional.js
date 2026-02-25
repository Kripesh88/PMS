const deleteProfessionalServices = require('../../services/admin/delete-professional');
const http = require('http-status');
module.exports = async (req, res, next) => {
  try {
    const professionals = await deleteProfessionalServices({
      user: req.user,
      professionalId: req.params.id,
    });

    res.status(http.status.OK).json({
      success: true,
      message: 'success',
      data: professionals,
    });
  } catch (error) {
    next(error);
  }
};
