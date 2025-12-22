const { Groomer } = require('../../../models');
const { ValidationError } = require('../../../errors');

module.exports = async () => {
  const groomers = await Groomer.findAll({
    attributes: ['id', 'name', 'specialization', 'experienceYears','rating','status'],
  });

  if (!groomers || groomers.length === 0) {
    throw new ValidationError('No Groomers found', 404);
  }

  return groomers;
};
