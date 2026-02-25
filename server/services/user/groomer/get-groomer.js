const { Groomer } = require('../../../models');
const { ValidationError } = require('../../../errors');

module.exports = async (user) => {
  if(!user) {
    throw new ValidationError('User not authenticated', 401);
  }
  const groomers = await Groomer.findAll({
    attributes: ['id', 'name', 'specialization', 'experienceYears', 'rating', 'status', 'userId'],
  });

  if (!groomers || groomers.length === 0) {
    throw new ValidationError('No Groomers found', 404);
  }

  return groomers;
};
