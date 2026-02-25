const { User, Pet, sequelize } = require('../../models');
const { Op } = require('sequelize');

module.exports = async ({ query }) => {
  const { name } = query;

  const whereCondition = { roleId: 2 };

  // Add name filter
  if (name) {
    whereCondition.name = { [Op.like]: `%${name}%` };
  }

  const users = await User.findAll({
    where: whereCondition,
    attributes: [
      'id',
      'name',
      'email',
      'phone',
      'createdAt',
      [sequelize.fn('COUNT', sequelize.col('pets.id')), 'totalPets'],
    ],
    include: [
      {
        model: Pet,
        as: 'pets',
        attributes: [],
        required: false,
      },
    ],
    group: ['User.id'],
    order: [['createdAt', 'DESC']],
  });

  return users;
};
