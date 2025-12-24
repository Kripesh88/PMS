const getPetService = require('../../../services/user/pet/get-pet');
const http = require('http-status');

module.exports = async (req, res, next) => {
  try {
   

    const pet = await getPetService({ 
      userId : req.params.userId,
     petId : req.params.petId,
     });

    return res.status(http.status.OK).json({
      message:'success',
      data: pet,
    });
  } catch (error) {
    next(error);
  }
};
