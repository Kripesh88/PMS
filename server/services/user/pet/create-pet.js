const { Pet, Breed } = require('../../../models');
const { ValidationError } = require('../../../errors');

module.exports = async ({ userId, breedId, age }) => {
  if (!userId) {
    throw new ValidationError('User Not Authenticated', 401);
  }

  if (!breedId) {
    throw new ValidationError('Breed Not Found', 404);
  }
  if (!age) {
    throw new ValidationError('Age is required', 400);
  }

  const breed = await Breed.findByPk(breedId);
  if (!breed) {
    throw new ValidationError('Invalid Breed Selected', 404);
  }

  const pet = await Pet.create({
    userId,
    breedId,
    age,
  });
  return pet;
};
