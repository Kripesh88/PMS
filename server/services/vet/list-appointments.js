const { Appointment, Pet, User, Vet } = require('../../models');
const { ValidationError } = require('../../errors');

module.exports = async ({ user }) => {
  if (!user) {
    throw new ValidationError('User not found', 401);
  }

  const vet = await Vet.findOne({
    where: { userId: user.id },
  });

  if (!vet) {
    throw new ValidationError('Vet profile not found', 404);
  }

  const appointments = await Appointment.findAll({
    where: {
      vetId: vet.id,
    },
    include: [
      {
        model: Pet,
        as: 'pet',
        attributes: ['id', 'name', 'age'],
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email'],
      },
    ],
    order: [['appointmentDate', 'ASC']],
  });

  return appointments;
};
