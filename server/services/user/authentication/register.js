const { User, Breed, sequelize } = require('../../../models');
const bcrypt = require('bcryptjs');
const createPet = require('../../../services/user/pet/create-pet');

module.exports = async ({ name, email, password, phone, breedId, age }) => {
  const transaction = await sequelize.transaction();

  try {
    // 1. Check email
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      throw new Error('Email already registered');
    }

    // 2. Validate breed
    const findSpecies = await Breed.findOne({
      where: { id: breedId },
      attributes: ['id', 'species', 'name'],
    });

    if (!findSpecies) {
      throw new Error('Selected breed does not exist');
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user with roleId = 2 (User)
    const user = await User.create(
      {
        name,
        email,
        phone,
        password: hashedPassword,
        roleId: 2,
      },
      { transaction }
    );

    // 5. Create pet
    const pet = await createPet(
      {
        user,
        breedId,
        age,
      },
      transaction
    );

    await transaction.commit();

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.roleId,
      pet: {
        id: pet.id,
        breed: findSpecies.name,
        species: findSpecies.species,
        age: pet.age,
      },
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
