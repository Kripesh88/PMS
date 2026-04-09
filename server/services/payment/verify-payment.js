const axios = require('axios');
const { Order, Appointment, sequelize } = require('../../models');
const { ValidationError } = require('../../errors');
const createNotification = require('../notification/create-notification');

module.exports = async ({ pidx, user }) => {
  if (!pidx) {
    throw new ValidationError('pidx is required', 400);
  }

  const order = await Order.findOne({ where: { pidx } });

  if (!order) {
    throw new ValidationError('Order not found', 404);
  }

  // Notification
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

  let appointment;

  try {
    if (response.data.status === 'Completed') {
      //  Update order
      order.status = 'completed';
      order.transactionId = response.data.transaction_id;

      //  Fetch appointment
      appointment = await Appointment.findByPk(order.appointmentId, {
        transaction: t,
      });

      if (!appointment) {
        throw new ValidationError('Linked appointment not found', 404);
      }

      //  Update appointment
      appointment.paymentStatus = 'completed';

      const allowedStatuses = ['pending', 'confirmed', 'cancelled'];
      if (allowedStatuses.includes(appointment.status)) {
        appointment.status = 'completed';
      }

      await appointment.save({ transaction: t });

      //  Save order inside transaction
      await order.save({ transaction: t });

      //  Commit first (important for consistency)
      await t.commit();

      //  Send notification AFTER successful commit
      await createNotification({
        senderId: user?.id || appointment.userId,
        receiverId: appointment.userId,
        appointmentId: appointment.id,
        orderId: order.id,
        title: 'Payment Successful',
        message: 'Your Khalti payment has been completed successfully.',
      });
    } else {
      //  Payment failed
      order.status = 'failed';
      await order.save({ transaction: t });
      await t.commit();
    }
  } catch (error) {
    await t.rollback();
    throw error;
  }

  return order;
};
