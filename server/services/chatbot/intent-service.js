module.exports = async (message) => {
  const msg = message.toLowerCase();

  if (
    msg.includes('vet') ||
    msg.includes('groom') ||
    msg.includes('status') ||
    msg.includes('busy') ||
    msg.includes('available') ||
    msg.includes('availability')
  ) {
    return 'CHECK_AVAILABILITY';
  }

  return 'GENERAL_QUERY';
};
