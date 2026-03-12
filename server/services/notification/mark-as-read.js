const { Notification } = require('../../models');
const { ValidationError } = require('../../errors');

module.exports = async (notificationId, userId) => {
  const notification = await Notification.findOne({
    where: {
      id: notificationId,
      receiverId: userId,
    },
  });

  if (!notification) {
    throw new ValidationError('Notification not found', 404);
  }

  notification.isRead = true;
  await notification.save();

  return notification;
};
