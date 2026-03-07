const { Notification, User } = require('../../models');
const { ValidationError } = require('../../errors');

module.exports = async ({ user }) => {
  if (!user) {
    throw new ValidationError('User Not Found', 404);
  }

  const notifications = await Notification.findAll({
    where: {
      receiverId: user.id,
    },
    include: [
      {
        model: User,
        as: 'sender',
        attributes: ['id', 'name', 'email'],
      },
    ],
    order: [['createdAt', 'DESC']],
  });

  return notifications;
};
