const { User, Vet, Groomer, sequelize } = require('../../models');
const { ValidationError } = require('../../errors');

module.exports = async ({ user, body }) => {
  if (!user) {
    throw new ValidationError('User not found', 404);
  }

  if (!['Vet', 'Groomer'].includes(user.roleName)) {
    throw new ValidationError('Only professionals can update their profile', 403);
  }

  const transaction = await sequelize.transaction();

  try {
    const { name, email, phone, specialization, experienceYears, status } = body;

    const existingUser = await User.findByPk(user.id, { transaction });

    if (!existingUser) {
      throw new ValidationError('User not found', 404);
    }

    await existingUser.update(
      {
        ...(name && { name }),
        ...(email && { email }),
        ...(phone && { phone }),
      },
      { transaction }
    );

    const professionalData = {
      ...(specialization && { specialization }),
      ...(experienceYears && { experienceYears }),
      ...(status && { status }),
    };

    let professionalProfile;

    if (user.roleName === 'Vet') {
      professionalProfile = await Vet.findOne({
        where: { userId: user.id },
        transaction,
      });

      if (!professionalProfile) {
        throw new ValidationError('Vet profile not found', 404);
      }

      await professionalProfile.update(professionalData, { transaction });
    }

    if (user.roleName === 'Groomer') {
      professionalProfile = await Groomer.findOne({
        where: { userId: user.id },
        transaction,
      });

      if (!professionalProfile) {
        throw new ValidationError('Groomer profile not found', 404);
      }

      await professionalProfile.update(professionalData, { transaction });
    }

    await transaction.commit();

    const updatedProfile = await User.findOne({
      where: { id: user.id },
      attributes: ['id', 'name', 'email', 'phone'],
      include: [
        {
          model: Vet,
          as: 'vets',
          attributes: ['specialization', 'experienceYears', 'status'],
          required: false,
        },
        {
          model: Groomer,
          as: 'groomers',
          attributes: ['specialization', 'experienceYears', 'status'],
          required: false,
        },
      ],
    });

    return updatedProfile;
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
    throw error;
  }
};
