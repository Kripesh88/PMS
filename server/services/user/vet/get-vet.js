const { Vet, User } = require('../../../models');
const { ValidationError } = require('../../../errors');

module.exports = async (user) => {
  if(!user) {
    throw new ValidationError('User not authenticated', 401);
  }
  const vets = await Vet.findAll({
    attributes: ['id', 'specialization', 'experienceYears','rating','status','userId','createdAt'],
    include: [
      {
        model:User,
        as: 'users',
        attributes: ['id', 'name', 'email','phone'],
     },
    ],
  });

  if (!vets || vets.length === 0) {
    throw new ValidationError('No Vets found', 404);
  }

  return vets;
};
