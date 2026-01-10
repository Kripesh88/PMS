const { User, Pet, Breed } = require('../../../models');
const { ValidationError } = require('../../../errors');

module.exports = async ({ userId }) => {
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
        attributes: ['id', 'age', 'name', 'gender', 'weight', 'description', 'medicalHistory'],
        include: [
          {
            model: Breed,
            as: 'breed',
            attributes: ['id', 'name', 'species'],
          },
        ],
      },
    ],
  });

  if (!user) {
    throw new ValidationError('User not found', 404);
  }

  return user;
};
