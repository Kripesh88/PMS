const { Appointment, Pet, Vet, Groomer } = require('../../../models');
const { ValidationError } = require('../../../errors');

module.exports = async ({ userId }) => {
  if (!userId) {
    throw new ValidationError('User not authenticated', 401);
  }

  return Appointment.findAll({
    where: {
      userId,
      status: 'completed',
    },
    include: [
      { model: Pet, as: 'pet' },
      { model: Vet, as: 'vet', required: false },
      { model: Groomer, as: 'groomer', required: false },
    ],
    order: [['appointmentDate', 'DESC']],
  });
};
