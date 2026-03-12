const axios = require('axios');
const { Order } = require('../../models');
const { ValidationError } = require('../../errors');

module.exports = async ({ user, amount }) => {
  if (!user) {
    throw new ValidationError('User not found', 404);
  }

  if (!amount || amount <= 0) {
    throw new ValidationError('Invalid amount', 400);
  }

  // Create order in paisa
  const order = await Order.create({
    userId: user.id,
    amount: amount * 100,
  });

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

  return {
    orderId: order.id,
    payment_url: response.data.payment_url,
  };
};
