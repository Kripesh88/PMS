const { User, sequelize } = require('../../models');
const { ValidationError } = require('../../errors');

module.exports = async ({ user, body, userId }) => {
  const transaction = await sequelize.transaction();

  try {
    const targetUserId = userId?.id || userId;

    if (!targetUserId) {
      throw new ValidationError('User ID not provided', 400);
    }

    const existingUser = await User.findByPk(targetUserId, { transaction });
    if (!existingUser || existingUser.roleId !== 2) {
      throw new ValidationError('User not found or cannot be edited', 404);
    }

    const { name, email, phone } = body;

    if (email && email !== existingUser.email) {
      const emailExists = await User.findOne({
        where: { email },
        transaction,
      });
      if (emailExists) {
        throw new ValidationError('Email already in use', 400);
      }
    }

    if (name) existingUser.name = name;
    if (email) existingUser.email = email;
    if (phone) existingUser.phone = phone;

    await existingUser.save({ transaction });
    await transaction.commit();

    return {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      phone: existingUser.phone,
      role: existingUser.roleId,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
