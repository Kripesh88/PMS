'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Pet, {
        foreignKey: 'userId',
        as: 'pets',
      });
      User.hasMany(models.Appointment, {
        foreignKey: 'userId',
        as: 'appointments',
      });
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'roles',
      });
      User.hasMany(models.Vet, {
        foreignKey: 'userId',
        as: 'vets',
      });
      User.hasMany(models.Groomer, {
        foreignKey: 'userId',
        as: 'groomers',
      });
      User.hasMany(models.Notification, {
        as: 'receivedNotifications',
        foreignKey: 'receiverId',
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
