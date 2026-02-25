const { Appointment, Pet, Vet, Groomer, Breed } = require('../../../models');
const { ValidationError } = require('../../../errors');

const GROOMER_ONLY_TYPES = ['grooming service'];

const VET_ONLY_TYPES = ['veterinary consultation', 'vaccination', 'general consultation'];

module.exports = async ({
  user,
  petId,
  serviceType,
  vetId,
  groomerId,
  appointmentDate,
  time,
  appointmentType,
  description,
}) => {
  if (!user) {
    throw new ValidationError('User Not Found', 404);
  }

  if (!petId || !serviceType || !appointmentDate || !time || !appointmentType) {
    throw new ValidationError('Required fields are missing', 400);
  }

  // 2. Service type validation
  if (!['vet', 'grooming'].includes(serviceType)) {
    throw new ValidationError('Invalid service type', 400);
  }

  // 3. Appointment type validation
  if (![...GROOMER_ONLY_TYPES, ...VET_ONLY_TYPES].includes(appointmentType)) {
    throw new ValidationError('Invalid appointment type', 400);
  }

  // 4. Appointment type ↔ provider mapping
  if (GROOMER_ONLY_TYPES.includes(appointmentType)) {
    if (serviceType !== 'grooming' || !groomerId) {
      throw new ValidationError('Grooming service must be booked with a groomer', 400);
    }
  }

  if (VET_ONLY_TYPES.includes(appointmentType)) {
    if (serviceType !== 'vet' || !vetId) {
      throw new ValidationError('This appointment type must be booked with a vet', 400);
    }
  }

  // 5. Prevent conflicting providers
  if (vetId && groomerId) {
    throw new ValidationError('Only one service provider is allowed', 400);
  }

  // 6. Check pet ownership
  const pet = await Pet.findOne({
    where: {
      id: petId,
      userId: user.id,
    },
  });

  if (!pet) {
    throw new ValidationError('Pet not found or does not belong to user', 404);
  }

  // 7. Provider existence check
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

  // 8. Create appointment
  const appointment = await Appointment.create({
    userId: user.id,
    petId,
    vetId: vetId || null,
    groomerId: groomerId || null,
    serviceType,
    appointmentType,
    appointmentDate, // DATEONLY
    time, // TIME
    description: description || null,
    status: 'pending',
  });

  return appointment;
};
