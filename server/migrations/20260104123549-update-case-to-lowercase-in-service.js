'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.changeColumn('Appointments', 'serviceType', {
      type: Sequelize.ENUM('vet', 'grooming'),
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('Appointments', 'serviceType', {
      type: Sequelize.ENUM('Vet', 'Grooming'),
      allowNull: false,
    });
  }
};
