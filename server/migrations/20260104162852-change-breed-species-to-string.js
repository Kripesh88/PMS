'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Breeds', 'species', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Breeds', 'species', {
      type: Sequelize.ENUM('dog','cat'),
      allowNull: true,
    });
  },
};
