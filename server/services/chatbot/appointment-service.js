const { Op } = require('sequelize');
const { Vet, Groomer, User } = require('../../models');

const STATUS_AVAILABLE = 'Available';
const STATUS_BUSY = 'Busy';

function extractProfessionalName(message) {
  const msg = message.toLowerCase();

  const explicit = msg.match(/(?:dr\.?|doctor|vet|groomer)\s+([a-z][a-z\s'-]{1,40})/);
  if (explicit?.[1]) {
    return explicit[1].trim();
  }

  if (msg.includes('name')) {
    const cleaned = msg
      .replace(/(is|are|any|available|busy|status|of|the|a|an)/g, ' ')
      .replace(/[^a-z\s'-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (cleaned.length >= 3) return cleaned;
  }

  return null;
}

function toNameList(records) {
  return records
    .map((record) => record?.users?.name)
    .filter(Boolean)
    .slice(0, 8);
}

function namesLine(label, names) {
  if (!names.length) return `No ${label} found in this status.`;
  return `${label}: ${names.join(', ')}`;
}

module.exports = async (message) => {
  const msg = message.toLowerCase();

  const wantsVet = msg.includes('vet') || msg.includes('doctor') || msg.includes('dr');
  const wantsGroomer = msg.includes('groom');
  const wantsBusy = msg.includes('busy');
  const wantsAvailable = msg.includes('available') || msg.includes('availability');
  const wantsBoth = !wantsVet && !wantsGroomer;
  const nameQuery = extractProfessionalName(message);

  const buildWhere = () => {
    if (wantsBusy && !wantsAvailable) return { status: STATUS_BUSY };
    if (wantsAvailable && !wantsBusy) return { status: STATUS_AVAILABLE };
    return { status: { [Op.in]: [STATUS_AVAILABLE, STATUS_BUSY] } };
  };

  const userFilter = nameQuery
    ? {
        model: User,
        as: 'users',
        where: { name: { [Op.like]: `%${nameQuery}%` } },
        attributes: ['name'],
        required: true,
      }
    : {
        model: User,
        as: 'users',
        attributes: ['name'],
      };

  if (wantsVet && !wantsGroomer) {
    const vets = await Vet.findAll({
      where: buildWhere(),
      include: [userFilter],
      order: [['status', 'ASC']],
      limit: 20,
    });

    if (!vets.length && nameQuery) {
      return `I could not find a vet with a name matching "${nameQuery}".`;
    }

    const availableNames = toNameList(vets.filter((v) => v.status === STATUS_AVAILABLE));
    const busyNames = toNameList(vets.filter((v) => v.status === STATUS_BUSY));
    return [
      `Vets status: ${availableNames.length} available, ${busyNames.length} busy.`,
      namesLine('Available vets', availableNames),
      namesLine('Busy vets', busyNames),
    ].join('\n');
  }

  if (wantsGroomer && !wantsVet) {
    const groomers = await Groomer.findAll({
      where: buildWhere(),
      include: [userFilter],
      order: [['status', 'ASC']],
      limit: 20,
    });

    if (!groomers.length && nameQuery) {
      return `I could not find a groomer with a name matching "${nameQuery}".`;
    }

    const availableNames = toNameList(groomers.filter((g) => g.status === STATUS_AVAILABLE));
    const busyNames = toNameList(groomers.filter((g) => g.status === STATUS_BUSY));
    return [
      `Groomers status: ${availableNames.length} available, ${busyNames.length} busy.`,
      namesLine('Available groomers', availableNames),
      namesLine('Busy groomers', busyNames),
    ].join('\n');
  }

  if (wantsBoth || (wantsVet && wantsGroomer)) {
    const [vets, groomers] = await Promise.all([
      Vet.findAll({
        where: buildWhere(),
        include: [userFilter],
        order: [['status', 'ASC']],
        limit: 20,
      }),
      Groomer.findAll({
        where: buildWhere(),
        include: [userFilter],
        order: [['status', 'ASC']],
        limit: 20,
      }),
    ]);

    if (!vets.length && !groomers.length && nameQuery) {
      return `I could not find any vet or groomer with a name matching "${nameQuery}".`;
    }

    const availableVets = toNameList(vets.filter((v) => v.status === STATUS_AVAILABLE));
    const busyVets = toNameList(vets.filter((v) => v.status === STATUS_BUSY));
    const availableGroomers = toNameList(groomers.filter((g) => g.status === STATUS_AVAILABLE));
    const busyGroomers = toNameList(groomers.filter((g) => g.status === STATUS_BUSY));

    return [
      `Vets status: ${availableVets.length} available, ${busyVets.length} busy.`,
      namesLine('Available vets', availableVets),
      namesLine('Busy vets', busyVets),
      `Groomers status: ${availableGroomers.length} available, ${busyGroomers.length} busy.`,
      namesLine('Available groomers', availableGroomers),
      namesLine('Busy groomers', busyGroomers),
    ].join('\n');
  }

  return 'Please ask about vet or groomer availability/status.';
};
