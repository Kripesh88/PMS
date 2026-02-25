const { User, Vet, Groomer, sequelize } = require('../../models');
const { ValidationError } = require('../../errors');

module.exports = async ({ professionalId, user }) => {
  if (!user) {
    throw new ValidationError('User Not Found', 404);
  }

  if (user.roleName !== 'Admin') {
    throw new ValidationError('Only Admin can delete professionals', 403);
  }

  const transaction = await sequelize.transaction();

  try {
    // Find the professional user
    const existingUser = await User.findByPk(professionalId, { transaction });
    if (!existingUser) {
      throw new ValidationError('Professional not found', 404);
    }

    // Delete related Vet/Groomer record first
    if (existingUser.roleId === 3) {
      const vet = await Vet.findOne({ where: { userId: professionalId }, transaction });
      if (vet) await vet.destroy({ transaction });
    }

    if (existingUser.roleId === 4) {
      const groomer = await Groomer.findOne({ where: { userId: professionalId }, transaction });
      if (groomer) await groomer.destroy({ transaction });
    }

    // Delete the user
    await existingUser.destroy({ transaction });

    await transaction.commit();

    return { message: 'Professional deleted successfully' };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
