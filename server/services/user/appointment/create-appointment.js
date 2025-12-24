const { Appointment, Pet, Vet, Groomer } = require('../../../models');
const { ValidationError } = require('../../../errors');

module.exports = async ({
  userId,
  petId,
  serviceType,
  vetId,
  groomerId,
  appointmentDate,
  description,
}) => {
  // 1. Required fields
  if (!petId || !serviceType || !appointmentDate) {
    throw new ValidationError('Required fields are missing', 400);
  }

  // 2. Service type validation (MATCH ENUM)
  if (!['Vet', 'Grooming'].includes(serviceType)) {
    throw new ValidationError('Invalid service type', 400);
  }

  // 3. Provider validation
  if (serviceType === 'Vet' && !vetId) {
    throw new ValidationError('vetId is required for vet service', 400);
  }

  if (serviceType === 'Grooming' && !groomerId) {
    throw new ValidationError('groomerId is required for grooming service', 400);
  }

  if (vetId && groomerId) {
    throw new ValidationError('Only one service provider is allowed', 400);
  }

  // 4. Check pet ownership
  const pet = await Pet.findOne({
    where: {
      id: petId,
      userId,
    },
  });

  if (!pet) {
    throw new ValidationError(
      'Pet not found or does not belong to user',
      404
    );
  }

  // 5. Check provider existence
  if (vetId) {
    const vet = await Vet.findByPk(vetId);
    if (!vet) {
      throw new ValidationError('Vet not found', 404);
    }
  }

  if (groomerId) {
    const groomer = await Groomer.findByPk(groomerId);
    if (!groomer) {
      throw new ValidationError('Groomer not found', 404);
    }
  }

  // 6. Create appointment (CAMELCASE ONLY)
  const appointment = await Appointment.create({
    userId,
    petId,
    vetId: vetId || null,
    groomerId: groomerId || null,
    serviceType,
    appointmentDate,
    description: description || null,
    status: 'pending',
  });

  return appointment;
};
