const { Order, Appointment, sequelize } = require('../../models');
const { ValidationError } = require('../../errors');

module.exports = async ({ orderId, user }) => {
  if (!user) throw new ValidationError('User not found', 404);

  const order = await Order.findByPk(orderId);
  if (!order) throw new ValidationError('Order not found', 404);

  const appointment = await Appointment.findByPk(order.appointmentId);
  if (!appointment) {
    throw new ValidationError('Linked appointment not found', 404);
  }

  if (appointment.paymentStatus !== 'completed') {
    throw new ValidationError('Only completed payments can be refunded', 400);
  }

  if (appointment.paymentStatus === 'refunded') {
    throw new ValidationError('Payment already refunded', 400);
  }

  const t = await sequelize.transaction();

  try {
    //  Update order
    order.status = 'refunded';

    //  Update appointment
    appointment.paymentStatus = 'refunded';

    // cancel appointment
    if (appointment.status !== 'completed') {
      appointment.status = 'cancelled';
    }

    await order.save({ transaction: t });
    await appointment.save({ transaction: t });

    await t.commit();

    return {
      message: 'Payment refunded successfully',
      orderId: order.id,
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
