const { Pet, Breed } = require('../../../models');
const { ValidationError } = require('../../../errors');

module.exports = async ({ userId, petId }) => {
  if (!userId) {
    throw new ValidationError('User Not Authenticated', 401);
  }
  if (!petId) {
    throw new ValidationError('Pet ID is required', 400);
  }

  const pet = await Pet.findOne({
    where: { id: petId, userId },
    include: [
      {
        model: Breed,
        as:'breeds',
        attributes: ['id', 'name', 'species'], // Include whatever breed fields you want
      },
    ],
  });

  if (!pet) {
    throw new ValidationError('Pet Not Found', 404);
  }

  return pet;
};
