const { Appointment, Pet, Vet, Groomer } = require('../../../models');
const { Op } = require('sequelize');
const { ValidationError } = require('../../../errors');

module.exports = async ({ user }) => {
  if (!user) {
    throw new ValidationError('User not authenticated', 401);
  }

  return Appointment.findAll({
    where: {
      userId: user.id,
      status: {
        [Op.in]: ['pending', 'confirmed'],
      },
    },
    include: [
      { model: Pet, as: 'pet' },
      { model: Vet, as: 'vet', required: false },
      { model: Groomer, as: 'groomer', required: false },
    ],
    order: [
      ['appointmentDate', 'ASC'],
      ['time', 'ASC'],
    ],
  });
};
