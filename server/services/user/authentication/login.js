const jwt = require('jsonwebtoken');
const { User, Role, Pet, Breed } = require('../../../models');
const { ValidationError } = require('../../../errors');
const bcrypt = require('bcryptjs');

module.exports = async ({ email, password }) => {
  if (!email || !password) {
    throw new ValidationError('Email and Password Not Found', 404);
  }

  const user = await User.findOne({
    where: { email },
    include: [
      {
        model: Role,
        as: 'roles', // matches User.belongsTo(Role)
        attributes: ['id', 'name'],
      },
      {
        model: Pet,
        as: 'pets',
        required: false,
        attributes: ['id', 'age'],
        include: [{ model: Breed, as: 'breeds', attributes: ['id', 'name', 'species'] }],
      },
    ],
  });

  if (!user) throw new ValidationError('User Not Found', 404);

  // Compare password
  const isValid = await bcrypt.compare(password, user.password);
  
  if (!isValid) throw new ValidationError('Invalid Credentials', 401);

  // Safe role access
  const roleName = user.roles?.name || 'User';

  const token = jwt.sign(
    {
      id: user.id,
      roleId: user.roleId,
      roleName,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Only normal Users have pets
  const pet = roleName === 'User' ? user.pets?.[0] : null;

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      roleId: user.roleId,
      roleName,
    },
    pet: pet
      ? {
          id: pet.id,
          age: pet.age,
          species: pet.breeds?.species,
          breed: pet.breeds?.name,
        }
      : null,
  };
};
