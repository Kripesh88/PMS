const { User, Pet, Breed } = require('../../../models');
const bcrypt = require('bcryptjs');
const jwt = require('../../../utils/authentication/jwt');

module.exports = async ({ email, password }) => {
  // 1. Find user (pets optional)
  const user = await User.findOne({
    where: { email },
    attributes: ['id', 'name', 'email', 'password', 'role'],
    include: [
      {
        model: Pet,
        as: 'pets',
        required: false, 
        attributes: ['id', 'age'],
        include: [
          {
            model: Breed,
            as: 'breeds',
            attributes: ['species', 'name'],
          },
        ],
      },
    ],
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // 3. Generate JWT
  const accessToken = jwt.generateAccessToken({
    id: user.id,
    role: user.role,
  });

  // 4. Only users have pets
  const pet = user.role === 'user' ? user.pets?.[0] : null;

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken,
    },
    pet: pet
      ? {
          id: pet.id,
          age: pet.age,
          species: pet.breeds.species,
          breed: pet.breeds.name,
        }
      : null,
  };
};