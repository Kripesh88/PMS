const { Appointment, Pet } = require('../../../models');
const { ValidationError } = require('../../../errors');

module.exports = async ({
  userId,
  petId,
  serviceType,
  vetId,
  groomerId,
  appointmentDate,
}) => {
  const pet = await Pet.findOne({ where: { id: petId, userId } });
  if (!pet) {
    throw new ValidationError('Pet not found', 404);
  }

  if (
    (serviceType === 'vet' && !vetId) ||
    (serviceType === 'grooming' && !groomerId)
  ) {
    throw new ValidationError('Invalid service provider selection', 400);
  }

  return Appointment.create({
    userId,
    petId,
    vetId: serviceType === 'vet' ? vetId : null,
    groomerId: serviceType === 'grooming' ? groomerId : null,
    serviceType,
    appointmentDate,
    status: 'pending',
  });
};
