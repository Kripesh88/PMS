const updateProfileServices = require('../../services/vet/update-profile');
const http = require('http-status');
module.exports = async (req, res, next) => {
  try { 
    const professionals = await updateProfileServices({
      user: req.user,
      body: req.body,
    });
    res.status(http.status.OK).json({
        success: true,
        message: 'Profile updated successfully',
        data: professionals,
    });
  } catch (error) {
    next(error);
  }
};