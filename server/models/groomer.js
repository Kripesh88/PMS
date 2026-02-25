'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Groomer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Groomer.hasMany(models.Appointment, {
        foreignKey: 'groomerId',
        as: 'appointments',
      });
      Groomer.hasMany(models.Schedule, {
        foreignKey: 'groomerId',
        as: 'schedules',
      });
      Groomer.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'users',
      });
    }
  }
  Groomer.init(
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
      modelName: 'Groomer',
      timestamps: true,
    }
  );
  return Groomer;
};
