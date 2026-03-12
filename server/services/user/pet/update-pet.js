const { User, Pet, Breed, Role, sequelize } = require('../../../models');
const { ValidationError } = require('../../../errors');

module.exports = async ({ user, body }) => {
  if (!user) {
    throw new ValidationError('User not authenticated', 401);
  }

  const transaction = await sequelize.transaction();

  try {
    const { name, email, petId, pet, breedId } = body;

    const existingUser = await User.findByPk(user.id, { transaction });

    if (!existingUser) {
      throw new ValidationError('User not found', 404);
    }

    // Update user
    if (name || email) {
      await existingUser.update(
        {
          ...(name && { name }),
          ...(email && { email }),
        },
        { transaction }
      );
    }

    // Update pet
    if (petId && pet) {
      const existingPet = await Pet.findOne({
        where: {
          id: petId,
          userId: user.id,
        },
        transaction,
      });

      if (!existingPet) {
        throw new ValidationError('Pet not found', 404);
      }

      await existingPet.update(
        {
          ...(pet.name && { name: pet.name }),
          ...(pet.age && { age: pet.age }),
          ...(pet.gender && { gender: pet.gender }),
          ...(pet.weight && { weight: pet.weight }),
          ...(pet.description && { description: pet.description }),
          ...(pet.medicalHistory && { medicalHistory: pet.medicalHistory }),
          ...(breedId && { breedId }),
        },
        { transaction }
      );
    }

    await transaction.commit();

    // Fetch updated data
    const updatedUser = await User.findOne({
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
          attributes: [
            'id',
            'age',
            'name',
            'gender',
            'weight',
            'description',
            'medicalHistory',
          ],
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

    return {
      message: 'User and pet updated successfully',
      data: updatedUser,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};