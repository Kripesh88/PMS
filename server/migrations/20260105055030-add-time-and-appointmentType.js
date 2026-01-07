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
    await queryInterface.addColumn('Appointments','appointmentType',{
      type: Sequelize.ENUM('veterinary consultation','grooming service','vaccination','general consultation'),
      allowNull:false,
    });
    await queryInterface.addColumn('Appointments','time',{
      type: Sequelize.TIME,
      allowNull:false,
    });
    await queryInterface.changeColumn('Appointments','appointmentDate',{
      type: Sequelize.DATEONLY,
      allowNull:false
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Appointments','appointmentType');
    await queryInterface.removeColumn('Appointments','time');
    await queryInterface.changeColumn('Appointments','appointmentDate',{
      type: Sequelize.DATE,
      allowNull:false
    });
  }
};
