'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.Vet,{
        foreignKey:'vetId',
        as:'vet'
      });
      Schedule.belongsTo(models.Groomer,{
        foreignKey:'groomerId',
        as:'groomer'
      });
    }
  }
  Schedule.init({
     id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      appointmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
       
      },

      service_type: {
        type: DataTypes.ENUM('vet', 'grooming'),
        allowNull: false,
      },

      vetId: {
        type: DataTypes.INTEGER,
        allowNull: true,
     
      },

      groomerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      
      },

      schedule_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },

      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'scheduled',
      },
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};