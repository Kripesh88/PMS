const detectIntent = (message) => {
  const msg = message.toLowerCase();

  if (
    msg.includes('appointment') ||
    msg.includes('available') ||
    msg.includes('vet') ||
    msg.includes('groomer') ||
    msg.includes('booking')
  ) {
    return 'APPOINTMENT_QUERY';
  }

  return 'GENERAL_QUERY';
};

module.exports = detectIntent;
