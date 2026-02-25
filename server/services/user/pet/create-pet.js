const { Pet, Breed } = require('../../../models');
const { ValidationError } = require('../../../errors');

module.exports = async (
  { user, name, petType, breedId, age, gender, weight, description, medicalHistory },
  transaction = null
) => {
  if (!user) {
    throw new ValidationError('User not authenticated', 401);
  }

  // Registration MINIMUM
  if (!breedId) {
    throw new ValidationError('Breed is required', 400);
  }

  const breed = await Breed.findByPk(breedId);
  if (!breed) {
    throw new ValidationError('Invalid breed selected', 404);
  }

  return Pet.create(
    {
      userId: user.id,

    
      name: name || null,
      petType: petType || breed.species, // smart default
      gender: gender || null,
      weight: weight || null,
      description: description || null,
      medicalHistory: medicalHistory || null,

      // Shared
      breedId,
      age: age || null,
    },
    { transaction }
  );
};
