const axios = require('axios');
const { Order } = require('../../models');
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

  if (response.data.status === 'Completed') {
    order.status = 'completed';
    order.transactionId = response.data.transaction_id;
  } else {
    order.status = 'failed';
  }

  await order.save();

  return order;
};
