const axios = require('axios');
const { Appointment, Order } = require('../../models');
const { ValidationError } = require('../../errors');

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

  // Save method
  appointment.paymentMethod = method;

  // CASH FLOW
  if (method === 'cash') {
    appointment.paymentStatus = 'pending';
    await appointment.save();

    return {
      message: 'Cash payment selected',
      appointmentId: appointment.id,
    };
  }

  //  KHALTI FLOW
  const order = await Order.create({
    userId: user.id,
    appointmentId: appointment.id,
    amount: amount * 100, // in paisa
  });

  const response = await axios.post(
    `${process.env.KHALTI_BASE_URL}/epayment/initiate/`,
    {
      return_url: process.env.KHALTI_RETURN_URL,
      // return_url: `${process.env.KHALTI_WEBSITE_URL}/dashboard/my-appointments`,
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

  return {
    orderId: order.id,
    payment_url: response.data.payment_url,
    pidx: response.data.pidx,
  };
};
