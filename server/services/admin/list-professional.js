const { User, Vet, Groomer, Role, Sequelize } = require('../../models');
const { ValidationError } = require('../../errors');

const { Op } = Sequelize;

module.exports = async ({ user, query }) => {
  if (!user) {
    throw new ValidationError('User Not Found', 404);
  }

  if (user.roleName !== 'Admin') {
    throw new ValidationError('Only Admin can view professionals', 403);
  }

  const { roleId, search } = query;

  const whereCondition = {};

  if (roleId) {
    if (![3, 4].includes(Number(roleId))) {
      throw new ValidationError('Role must be 3 (Vet) or 4 (Groomer)', 400);
    }

    whereCondition.roleId = Number(roleId);
  } else {
    whereCondition.roleId = { [Op.in]: [3, 4] };
  }

  if (search) {
    whereCondition.name = {
      [Op.like]: `%${search}%`,
    };
  }

  const professionals = await User.findAll({
    where: whereCondition,
    attributes: ['id', 'name', 'email', 'phone', 'roleId'],
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
      {
        model: Role,
        as: 'roles',
        attributes: ['id', 'name'],
      },
    ],
    order: [['createdAt', 'DESC']],
    distinct: true,
  });

  return professionals;
};
