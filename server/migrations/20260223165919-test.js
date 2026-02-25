'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const vetColumns = await queryInterface.describeTable('Vets');
    if (!vetColumns.createdAt) {
      await queryInterface.addColumn('Vets', 'createdAt', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }
    if (!vetColumns.updatedAt) {
      await queryInterface.addColumn('Vets', 'updatedAt', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }

    const groomerColumns = await queryInterface.describeTable('Groomers');
    if (!groomerColumns.createdAt) {
      await queryInterface.addColumn('Groomers', 'createdAt', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }
    if (!groomerColumns.updatedAt) {
      await queryInterface.addColumn('Groomers', 'updatedAt', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const vetColumns = await queryInterface.describeTable('Vets');
    if (vetColumns.createdAt) await queryInterface.removeColumn('Vets', 'createdAt');
    if (vetColumns.updatedAt) await queryInterface.removeColumn('Vets', 'updatedAt');

    const groomerColumns = await queryInterface.describeTable('Groomers');
    if (groomerColumns.createdAt) await queryInterface.removeColumn('Groomers', 'createdAt');
    if (groomerColumns.updatedAt) await queryInterface.removeColumn('Groomers', 'updatedAt');
  },
};