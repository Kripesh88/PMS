const { User, Breed } = require('../../../models');
const bcrypt = require('bcryptjs');

module.exports = async ({ name, email, password, breedId }) => {
  // 1. Check if email exists
  const exists = await User.findOne({ where: { email } });
  if (exists) {
    throw new Error('Email already registered');
  }

  const findSpecies = await Breed.findOne({
    where: { id: breedId },
    attributes: ['species', 'name'],
  });
 

  if (!findSpecies) {
    throw new Error('Selected breed does not exist');
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    species: findSpecies.species,
    breed: findSpecies.name,
  };
};
