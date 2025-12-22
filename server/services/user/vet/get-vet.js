const { Vet } = require('../../../models');
const { ValidationError } = require('../../../errors');

module.exports = async () => {
  const vets = await Vet.findAll({
    attributes: ['id', 'name', 'specialization', 'experienceYears','rating','status'],
  });

  if (!vets || vets.length === 0) {
    throw new ValidationError('No Vets found', 404);
  }

  return vets;
};
