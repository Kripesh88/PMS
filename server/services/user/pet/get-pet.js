const { User, Pet, Breed, Role } = require('../../../models');
const { ValidationError } = require('../../../errors');

module.exports = async ({ user }) => {
  if (!user) {
    throw new ValidationError('User not authenticated', 401);
  }

  const users = await User.findOne({
    where: { id: user.id },
    attributes: ['id', 'name', 'email'],
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: ['id', 'name'],
      },
      {
        model: Pet,
        as: 'pets',
        attributes: ['id', 'age', 'name', 'gender', 'weight', 'description', 'medicalHistory'],
        include: [
          {
            model: Breed,
            as: 'breeds',
            attributes: ['id', 'name', 'species'],
          },
        ],
      },
    ],
  });

  if (!users) {
    throw new ValidationError('User not found', 404);
  }

  return users;
};
