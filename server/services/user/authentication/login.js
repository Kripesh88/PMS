const { User } = require('../../../models');
const bcrypt = require('bcryptjs');
const jwt = require('../../../utils/authentication/jwt');

module.exports = async ({ email, password }) => {
  // 1. Find user
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid email or password');

  // 2. Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  // 3. Generate access token
  const accessToken = jwt.generateAccessToken({
    id: user.id,
    role: user.role,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    accessToken,
  };
};
