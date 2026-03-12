const { Appointment } = require('../../../models');
const { ValidationError } = require('../../../errors');

const createNotification = require('../../notification/create-notification');

module.exports = async ({ user, appointmentId, appointmentDate, time, status }) => {
  if (!user) {
    throw new ValidationError('User Not Found', 404);
  }

  const appointment = await Appointment.findOne({
    where: {
      id: appointmentId,
      userId: user.id,
    },
  });

  if (!appointment) {
    throw new ValidationError('Appointment not found', 404);
  }

  // Validate status update
  if (status) {
    if (!(appointment.status === 'pending' && status === 'cancelled')) {
      throw new ValidationError('Users can only change status from pending to cancelled', 400);
    }
  }

  // Update appointment
  await appointment.update({
    ...(appointmentDate && { appointmentDate }),
    ...(time && { time }),
    ...(status && { status }),
  });

  // Find provider userId
  let receiverId = null;

  if (appointment.vetId) {
    const vet = await appointment.getVet();
    receiverId = vet.userId;
  }

  if (appointment.groomerId) {
    const groomer = await appointment.getGroomer();
    receiverId = groomer.userId;
  }

  // Send notification
  if (receiverId) {
    await createNotification({
      senderId: user.id,
      receiverId,
      appointmentId: appointment.id,
      title: 'Appointment Updated',
      message: `Appointment updated for ${appointment.appointmentDate} at ${appointment.time} having status as ${appointment.status}`,
    });
  }

  return appointment;
};
