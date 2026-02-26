const { Appointment, Groomer } = require('../../models');
const { ValidationError } = require('../../errors');

const ALLOWED_STATUS = ['confirmed', 'completed', 'cancelled'];

module.exports = async ({ appointmentId, user, status, time, appointmentDate }) => {
  if (!user) {
    throw new ValidationError('User Not Found', 404);
  }

  // 1. Role check
  if (user.roleName !== 'Groomer') {
    throw new ValidationError('Only groomer can update appointments', 403);
  }

  // 2. Status validation
  if (status && !ALLOWED_STATUS.includes(status)) {
    throw new ValidationError('Invalid status', 400);
  }

  // 3. Fetch appointment
  const appointment = await Appointment.findByPk(appointmentId);

  if (!appointment) {
    throw new ValidationError('Appointment not found', 404);
  }

  // 4. Groomer existence (logged-in groomer)
  const groomer = await Groomer.findOne({
    where: { userId: user.id }, // assuming groomer table links to user
  });

  if (!groomer) {
    throw new ValidationError('Groomer not found', 404);
  }

  // 5. Ownership check (VERY IMPORTANT FIX)
  if (appointment.groomerId !== groomer.id) {
    throw new ValidationError('This appointment is not assigned to this groomer', 403);
  }

  // 6. Status lifecycle rules
  if (appointment.status === 'completed') {
    throw new ValidationError('Completed appointments cannot be modified', 400);
  }

  if (appointment.status === 'cancelled') {
    throw new ValidationError('Cancelled appointments cannot be modified', 400);
  }

  if (status === 'completed' && appointment.status !== 'confirmed') {
    throw new ValidationError('Appointment must be confirmed before completion', 400);
  }

  if (status) {
    appointment.status = status;
  }

  if (appointmentDate) {
    appointment.appointmentDate = appointmentDate;
  }

  if (time) {
    appointment.time = time;
  }

  await appointment.save();

  return appointment;
};
