const { Appointment, Pet, User, Groomer } = require('../../models');
const { ValidationError } = require('../../errors');

module.exports = async ({ user }) => {
  if (!user) {
    throw new ValidationError('User not found', 401);
  }

  const groomer = await Groomer.findOne({
    where: { userId: user.id },
  });
  

  if (!groomer) {
    throw new ValidationError('Groomer profile not found', 404);
  }

  const appointments = await Appointment.findAll({
    where: {
      groomerId: groomer.id,
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
