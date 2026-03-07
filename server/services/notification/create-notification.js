const { Notification } = require('../../models');
const { ValidationError } = require('../../errors');

module.exports = async ({
  senderId,
  receiverId,
  appointmentId,
  title,
  message,
}) => {
  if (!senderId || !receiverId || !title || !message) {
    throw new ValidationError('Missing notification fields', 400);
  }

  const notification = await Notification.create({
    senderId,
    receiverId,
    appointmentId: appointmentId || null,
    title,
    message,
    isRead: false,
  });

  return notification;
};