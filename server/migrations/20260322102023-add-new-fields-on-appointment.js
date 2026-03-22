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
    await queryInterface.addColumn('Appointments', 'paymentMethod', {
      type: Sequelize.ENUM('khalti', 'cash'),
      allowNull:true,
    });
    await queryInterface.addColumn('Appointments', 'paymentStatus', {
      type: Sequelize.ENUM('pending', 'completed', 'failed'),
      allowNull:true,
    });
    await queryInterface.addColumn('Appointments', 'orderId', {
      type: Sequelize.INTEGER,
      allowNull:true,
      references: {
        model: 'Orders',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    await queryInterface.addColumn('Appointments', 'price', {
      type: Sequelize.INTEGER,
      allowNull:true,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Appointments', 'paymentMethod');
    await queryInterface.removeColumn('Appointments', 'paymentStatus');
    await queryInterface.removeColumn('Appointments', 'orderId');
    await queryInterface.removeColumn('Appointments', 'price');
  }
};
