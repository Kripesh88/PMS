const { Breed } = require('../../models');
const { ValidationError } = require('../../errors');

module.exports = async () => {
  const breeds = await Breed.findAll({
    attributes: ['id', 'name', 'species', 'description', 'image'],
  });

  if (!breeds || breeds.length === 0) {
    throw new ValidationError('No breeds found', 404);
  }

  return breeds;
};
