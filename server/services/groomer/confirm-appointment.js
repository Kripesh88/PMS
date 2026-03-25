const { Appointment, Groomer } = require('../../models');
const { ValidationError } = require('../../errors');
const createNotification = require('../notification/create-notification');

const ALLOWED_STATUS = ['confirmed', 'completed', 'cancelled'];

module.exports = async ({ appointmentId, user, status, time, appointmentDate }) => {
  if (!user) throw new ValidationError('User Not Found', 404);

  if (user.roleName !== 'Groomer') {
    throw new ValidationError('Only groomer can update appointments', 403);
  }

  if (status && !ALLOWED_STATUS.includes(status)) {
    throw new ValidationError('Invalid status', 400);
  }

  const appointment = await Appointment.findByPk(appointmentId);
  if (!appointment) throw new ValidationError('Appointment not found', 404);

  const groomer = await Groomer.findOne({ where: { userId: user.id } });
  if (!groomer) throw new ValidationError('Groomer not found', 404);

  if (appointment.groomerId !== groomer.id) {
    throw new ValidationError('Not your appointment', 403);
  }

  if (appointment.status === 'completed' || appointment.status === 'cancelled') {
    throw new ValidationError('Cannot modify this appointment', 400);
  }

  if (status === 'completed') {
    if (appointment.status !== 'confirmed') {
      throw new ValidationError('Must confirm before completion', 400);
    }

    if (appointment.paymentStatus !== 'paid' && appointment.paymentMethod === 'khalti') {
      throw new ValidationError('Payment not completed', 400);
    }
  }

  if (status) appointment.status = status;
  if (appointmentDate) appointment.appointmentDate = appointmentDate;
  if (time) appointment.time = time;

  await appointment.save();

  await createNotification({
    senderId: user.id,
    receiverId: appointment.userId,
    appointmentId: appointment.id,
    title: 'Appointment Updated',
    message: `Your appointment is now ${appointment.status}`,
  });

  return appointment;
};
