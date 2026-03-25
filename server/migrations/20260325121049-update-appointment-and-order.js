'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('Appointments', 'paymentStatus', {
      type: Sequelize.ENUM('pending', 'completed', 'failed', 'refunded'),
      allowNull: true,
    });
    await queryInterface.changeColumn('Orders', 'status', {
      type: Sequelize.ENUM('pending', 'completed', 'initiated', 'failed', 'refunded'),
      defaultValue: 'pending',
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('Appointments', 'paymentStatus', {
      type: Sequelize.ENUM('pending', 'completed', 'failed'),
      allowNull: true,
    });
    await queryInterface.changeColumn('Orders', 'status', {
      type: Sequelize.ENUM('pending', 'completed', 'initiated', 'failed'),
      defaultValue: 'pending',
    });
  },
};
