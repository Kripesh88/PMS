const { Appointment , Groomer } = require('../../models');
const { ValidationError } = require('../../errors');

const ALLOWED_STATUS = ['confirmed', 'completed', 'cancelled'];

module.exports = async ({
  appointmentId,
  groomerId,
  status,
}) => {

  // 1. Status validation
  if (!ALLOWED_STATUS.includes(status)) {
    throw new ValidationError('Invalid status', 400);
  }

  // 2. Fetch appointment
  const appointment = await Appointment.findByPk(appointmentId);

  if (!appointment) {
    throw new ValidationError('Appointment not found', 404);
  }

  // 3. Groomer existence
  const groomer = await Groomer.findByPk(groomerId);
  if (!groomer) {
    throw new ValidationError('Groomer not found', 404);
  }


  // 4. Ownership check
  if (appointment.groomerId !== Number(groomerId)) {
    throw new ValidationError(
      'This appointment is not assigned to this groomer',
      403
    );
  }

  // 5. Status lifecycle rules
  if (appointment.status === 'completed') {
    throw new ValidationError(
      'Completed appointments cannot be modified',
      400
    );
  }

  if (appointment.status === 'cancelled') {
    throw new ValidationError(
      'Cancelled appointments cannot be modified',
      400
    );
  }

  if (
    status === 'completed' &&
    appointment.status !== 'confirmed'
  ) {
    throw new ValidationError(
      'Appointment must be confirmed before completion',
      400
    );
  }

  // 6. Update status
  appointment.status = status;
  await appointment.save();

  return appointment;
};
