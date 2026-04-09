const axios = require('axios');
const { Appointment, Order } = require('../../models');
const { ValidationError } = require('../../errors');
const createNotification = require('../notification/create-notification');

module.exports = async ({ appointmentId, user, method, amount }) => {
  if (!user) {
    throw new ValidationError('User not found', 404);
  }

  if (!amount || amount <= 0) {
    throw new ValidationError('Invalid amount', 400);
  }

  const appointment = await Appointment.findByPk(appointmentId);

  if (!appointment) {
    throw new ValidationError('Appointment not found', 404);
  }

  if (appointment.userId !== user.id) {
    throw new ValidationError('Unauthorized', 403);
  }

  if (appointment.status !== 'confirmed') {
    throw new ValidationError('Appointment must be confirmed first', 400);
  }

  if (appointment.paymentStatus === 'paid') {
    throw new ValidationError('Already paid', 400);
  }

  if (!['cash', 'khalti'].includes(method)) {
    throw new ValidationError('Invalid payment method', 400);
  }

  // Save payment method
  appointment.paymentMethod = method;

  //  Create order FIRST (used in both cash & khalti)
  const order = await Order.create({
    userId: user.id,
    appointmentId: appointment.id,
    amount: amount * 100, // in paisa
    status: method === 'cash' ? 'completed' : 'pending',
  });

  //Cash Payment
  if (method === 'cash') {
    appointment.paymentStatus = 'completed';
    appointment.status = 'completed';
    appointment.orderId = order.id;

    await appointment.save();

    // ensure order status
    order.status = 'completed';
    await order.save();

    await createNotification({
      senderId: user.id,
      receiverId: appointment.userId,
      appointmentId: appointment.id,
      orderId: order.id,
      title: 'Payment Completed',
      message: 'Your cash payment has been completed successfully',
    });

    return {
      message: 'Cash payment completed successfully',
      appointmentId: appointment.id,
      orderId: order.id,
    };
  }

  const response = await axios.post(
    `${process.env.KHALTI_BASE_URL}/epayment/initiate/`,
    {
      return_url: process.env.KHALTI_RETURN_URL,
      website_url: process.env.KHALTI_WEBSITE_URL,
      amount: order.amount,
      purchase_order_id: order.id,
      purchase_order_name: `Order-${order.id}`,
    },
    {
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  order.pidx = response.data.pidx;
  order.status = 'initiated';
  await order.save();

  appointment.orderId = order.id;
  await appointment.save();

  await createNotification({
    senderId: user.id,
    receiverId: appointment.userId,
    appointmentId: appointment.id,
    orderId: order.id,
    title: 'Payment Initiated',
    message: `Your payment is now ${order.status}`,
  });

  return {
    orderId: order.id,
    payment_url: response.data.payment_url,
    pidx: response.data.pidx,
  };
};
