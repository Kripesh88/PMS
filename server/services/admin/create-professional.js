const { User, Vet, Groomer, sequelize } = require('../../models');
const { ValidationError } = require('../../errors');
const bcrypt = require('bcryptjs');

module.exports = async ({ body, user }) => {
  if (!user) {
    throw new ValidationError('User Not Found', 404);
  }
  if (user.roleName !== 'Admin') {
    throw new ValidationError('Only Admin can add professionals', 403);
  }
  const transaction = await sequelize.transaction();

  try {
    const { name, email, phone, password, roleId, speciality, expertise, status } = body;

    if (!name || !email || !phone || !password || !roleId || !speciality || !expertise || !status) {
      throw new ValidationError('All fields are required', 400);
    }

    if (![3, 4].includes(roleId)) {
      throw new ValidationError('Role must be 3 (Vet) or 4 (Groomer)', 400);
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      throw new ValidationError('Email already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create(
      {
        name,
        email,
        phone,
        password: hashedPassword,
        roleId,
      },
      { transaction }
    );

    const professionalData = {
      userId: user.id,
      specialization: speciality,
      experienceYears: expertise,
      status,
    };

    if (roleId === 3) {
      await Vet.create(professionalData, { transaction });
    }

    if (roleId === 4) {
      await Groomer.create(professionalData, { transaction });
    }

    await transaction.commit();

    return user;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
