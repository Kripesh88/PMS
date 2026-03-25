const axios = require('axios');
const { Order, Appointment, sequelize } = require('../../models');
const { ValidationError } = require('../../errors');

module.exports = async ({ pidx }) => {
  if (!pidx) {
    throw new ValidationError('pidx is required', 400);
  }

  const order = await Order.findOne({ where: { pidx } });

  if (!order) {
    throw new ValidationError('Order not found', 404);
  }

  // Prevent duplicate verification
  if (order.status === 'completed') {
    return order;
  }

  if (order.status === 'refunded') {
    throw new ValidationError('Cannot verify a refunded order', 400);
  }

  const response = await axios.post(
    `${process.env.KHALTI_BASE_URL}/epayment/lookup/`,
    { pidx },
    {
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const t = await sequelize.transaction();

  try {
    if (response.data.status === 'Completed') {
      // Update order
      order.status = 'completed';
      order.transactionId = response.data.transaction_id;

      // Update appointment
      const appointment = await Appointment.findByPk(order.appointmentId, {
        transaction: t,
      });

      if (!appointment) {
        throw new ValidationError('Linked appointment not found', 404);
      }

      // Always update paymentStatus
      appointment.paymentStatus = 'completed';

      // Only update appointment.status if it's pending, confirmed, or cancelled
      const allowedStatuses = ['pending', 'confirmed', 'cancelled'];
      if (allowedStatuses.includes(appointment.status)) {
        appointment.status = 'completed';
      }

      await appointment.save({ transaction: t });
    } else {
      order.status = 'failed';
    }

    await order.save({ transaction: t });
    await t.commit();

    return order;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
