const { Appointment, Pet, Vet, Groomer } = require('../../../models');
const { ValidationError } = require('../../../errors');

const createNotification = require('../../notification/create-notification');

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

  if (!['vet', 'grooming'].includes(serviceType)) {
    throw new ValidationError('Invalid service type', 400);
  }

  if (![...GROOMER_ONLY_TYPES, ...VET_ONLY_TYPES].includes(appointmentType)) {
    throw new ValidationError('Invalid appointment type', 400);
  }

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

  if (vetId && groomerId) {
    throw new ValidationError('Only one service provider is allowed', 400);
  }

  const pet = await Pet.findOne({
    where: {
      id: petId,
      userId: user.id,
    },
  });

  if (!pet) {
    throw new ValidationError('Pet not found or does not belong to user', 404);
  }

  let providerUserId = null;

  if (vetId) {
    const vet = await Vet.findByPk(vetId);

    if (!vet) {
      throw new ValidationError('Vet not found', 404);
    }

    providerUserId = vet.userId;
  }

  if (groomerId) {
    const groomer = await Groomer.findByPk(groomerId);

    if (!groomer) {
      throw new ValidationError('Groomer not found', 404);
    }

    providerUserId = groomer.userId;
  }

  const appointment = await Appointment.create({
    userId: user.id,
    petId,
    vetId: vetId || null,
    groomerId: groomerId || null,
    serviceType,
    appointmentType,
    appointmentDate,
    time,
    description: description || null,
    status: 'pending',
  });

  await createNotification({
    senderId: user.id,
    receiverId: providerUserId,
    appointmentId: appointment.id,
    title: 'New Appointment Booked',
    message: `New appointment scheduled on ${appointmentDate} at ${time}`,
  });

  return appointment;
};
