'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vet.hasMany(models.Appointment, {
        foreignKey: 'vetId',
        as: 'appointments',
      });
      Vet.hasMany(models.Schedule, {
        foreignKey: 'vetId',
        as: 'schedules',
      });
      Vet.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'users',
      });
    }
  }
  Vet.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      specialization: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      experienceYears: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('Available', 'Busy'),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Vet',
      timerstamps: true,
    }
  );
  return Vet;
};
