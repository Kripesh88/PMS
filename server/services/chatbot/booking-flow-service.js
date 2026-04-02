const { ChatSession } = require('../../models');
const bookingService = require('../booking.service');

module.exports = async (message, user) => {
  const msg = message.toLowerCase();

  let session = await ChatSession.findOne({
    where: { userId: user.id },
  });

  if (!session && msg.includes('book')) {
    session = await ChatSession.create({
      userId: user.id,
      step: 'ASK_DATE',
      tempData: {},
    });

    return 'What date do you want?';
  }

  if (!session) return null;

  if (session.step === 'ASK_DATE') {
    session.tempData = { date: message };
    session.step = 'ASK_TIME';
    await session.save();

    return 'What time?';
  }

  if (session.step === 'ASK_TIME') {
    session.tempData.time = message;
    session.step = 'CONFIRM';
    await session.save();

    return `Confirm booking on ${session.tempData.date} at ${session.tempData.time}? (yes/no)`;
  }

  if (session.step === 'CONFIRM') {
    if (msg === 'yes') {
      const booking = await bookingService.createBooking({
        userId: user.id,
        date: session.tempData.date,
        time: session.tempData.time,
      });

      await session.destroy();

      return `Booking confirmed. ID: ${booking.id}`;
    }

    await session.destroy();
    return 'Booking cancelled.';
  }

  return null;
};
