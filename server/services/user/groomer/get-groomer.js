const { Groomer, User } = require('../../../models');
const { ValidationError } = require('../../../errors');

module.exports = async (user) => {
  if(!user) {
    throw new ValidationError('User not authenticated', 401);
  }
  const groomers = await Groomer.findAll({
    attributes: ['id', 'specialization', 'experienceYears', 'rating', 'status', 'userId'],
    include: [
      {
        model:User,
        as: 'users',
        attributes: ['id', 'name', 'email'],
     },
    ],       
    
  });

  if (!groomers || groomers.length === 0) {
    throw new ValidationError('No Groomers found', 404);
  }

  return groomers;
};
