const createPetService = require('../../../services/user/pet/create-pet');
const http = require('http-status');

module.exports = async (req, res, next) => {
  try {
    const pet = await createPetService({
      userId: req.params.userId,
      ...req.body,
    });

    res.status(http.status.OK).json({
      message:'success',
      data: pet,
    });
  } catch (error) {
    next(error);
  }
};


