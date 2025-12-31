const { User, Pet, Breed } = require('../../../models');
const bcrypt = require('bcryptjs');
const jwt = require('../../../utils/authentication/jwt');

module.exports = async ({ email, password }) => {
  // 1. Find user along with their pet and breed
  const user = await User.findOne({
    where: { email },
    attributes: ['id', 'name', 'email', 'password', 'role'],
    include: [
      {
        model: Pet,
        as:'pets',
        attributes: ['id', 'age'],
        include: [
          {
            model: Breed,
            as:'breeds',
            attributes: ['species', 'name'],
          },
        ],
      },
    ],
  });

  if (!user) throw new Error('Invalid email or password');

  // 2. Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  // 3. Generate access token
  const accessToken = jwt.generateAccessToken({
    id: user.id,
    role: user.role,
  });

  // 4. Get pet information (assuming 1 pet per user)
  const pet = user.pets?.[0];

  // 5. Return user + pet info
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
