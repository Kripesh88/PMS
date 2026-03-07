const { Notification } = require('../../models');
const { ValidationError } = require('../../errors');
module.exports = async (userId) => {
  if (!userId) {
    throw new ValidationError('User Not Found', 404);
  }
  const count = await Notification.count({
    where: {
      receiverId: userId,
      isRead: false,
    },
  });

  return { unreadCount: count };
};
