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
    await queryInterface.addColumn('Pets', 'name', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Pets', 'gender', {
      type: Sequelize.ENUM('male', 'female'),
      allowNull: true,
    });

    await queryInterface.addColumn('Pets', 'weight', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn('Pets', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('Pets', 'medicalHistory', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Pets', 'name');
    await queryInterface.removeColumn('Pets', 'gender');
    await queryInterface.removeColumn('Pets', 'weight');
    await queryInterface.removeColumn('Pets', 'description');
    await queryInterface.removeColumn('Pets', 'medicalHistory');
  },
};
