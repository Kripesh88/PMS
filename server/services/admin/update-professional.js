const { User, Vet, Groomer, sequelize } = require('../../models');
const { ValidationError } = require('../../errors');
const bcrypt = require('bcryptjs');

module.exports = async ({ body, professionalId, user }) => {
  if (!user) {
    throw new ValidationError('User Not Found', 404);
  }

  if (user.roleName !== 'Admin') {
    throw new ValidationError('Only Admin can update professionals', 403);
  }

  const transaction = await sequelize.transaction();

  try {
    const { name, email, phone, password, roleId, speciality, expertise, status } = body;

    if (!name && !email && !phone && !password && !roleId && !speciality && !expertise && !status) {
      throw new ValidationError('At least one field is required to update', 400);
    }

    // Find the user to update
    const existingUser = await User.findByPk(professionalId, { transaction });
    if (!existingUser) {
      throw new ValidationError('Professional not found', 404);
    }

    // Validate role change
    if (roleId && ![3, 4].includes(roleId)) {
      throw new ValidationError('Role must be 3 (Vet) or 4 (Groomer)', 400);
    }

    // Check email uniqueness
    if (email && email !== existingUser.email) {
      const emailTaken = await User.findOne({ where: { email }, transaction });
      if (emailTaken) {
        throw new ValidationError('Email already exists', 400);
      }
    }

    // Hash password if provided
    let hashedPassword = existingUser.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update User
    await existingUser.update(
      {
        name: name || existingUser.name,
        email: email || existingUser.email,
        phone: phone || existingUser.phone,
        password: hashedPassword,
        roleId: roleId || existingUser.roleId,
      },
      { transaction }
    );

    // Prepare professional data
    const professionalData = {};
    if (speciality) professionalData.specialization = speciality;
    if (expertise) professionalData.experienceYears = expertise;
    if (status) professionalData.status = status;

    // Update Vet or Groomer
    if ([3, null, undefined].includes(roleId || existingUser.roleId)) {
      const vet = await Vet.findOne({ where: { userId: existingUser.id }, transaction });
      if (vet && Object.keys(professionalData).length) {
        await vet.update(professionalData, { transaction });
      }
    }

    if ([4, null, undefined].includes(roleId || existingUser.roleId)) {
      const groomer = await Groomer.findOne({ where: { userId: existingUser.id }, transaction });
      if (groomer && Object.keys(professionalData).length) {
        await groomer.update(professionalData, { transaction });
      }
    }

    await transaction.commit();

    return existingUser;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
