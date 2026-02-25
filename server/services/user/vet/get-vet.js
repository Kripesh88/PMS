const { Vet } = require('../../../models');
const { ValidationError } = require('../../../errors');

module.exports = async (user) => {
  if(!user) {
    throw new ValidationError('User not authenticated', 401);
  }
  const vets = await Vet.findAll({
    attributes: ['id', 'name', 'specialization', 'experienceYears','rating','status','userId'],
  });

  if (!vets || vets.length === 0) {
    throw new ValidationError('No Vets found', 404);
  }

  return vets;
};
