const { User } = require('../../models');
const bcrypt = require('bcryptjs');

module.exports = async ({ name, email, password }) => {

  // 1. Check if email exists
  const exists = await User.findOne({ where: { email } });
  if (exists) {
    throw new Error('Email already registered');
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
  };
};
