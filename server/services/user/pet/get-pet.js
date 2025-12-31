const { User, Pet, Breed } = require('../../../models');
const { ValidationError } = require('../../../errors');

module.exports = async ({ userId, petId }) => {
  if (!userId) {
    throw new ValidationError('User not authenticated', 401);
  }

  const user = await User.findOne({
    where: { id: userId },
    attributes: ['id', 'name', 'email', 'role'],
    include: [
      {
        model: Pet,
        as: 'pets',   
        where: { id: petId },
        attributes: ['id', 'age'],
        include: [
          {
            model: Breed,
            as:'breeds',
            attributes: ['name', 'species','image'],
          },
        ],
      },
    ],
  });

  if (!user) {
    throw new ValidationError('User or Pet not found', 404);
  }

  return user;
};
