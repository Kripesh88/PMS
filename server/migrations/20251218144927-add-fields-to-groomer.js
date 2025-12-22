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
    await queryInterface.addColumn('Groomers', 'rating', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
    await queryInterface.addColumn('Groomers', 'status', {
      type: Sequelize.ENUM('Available','Busy'),
      allowNull: true,
    });
  },

  

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
   await queryInterface.removeColumn('Groomers','rating');
    await queryInterface.removeColumn('Groomers','status');
  }
};
