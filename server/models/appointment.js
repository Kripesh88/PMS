'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Appointment.belongsTo(models.User,{
        foreignKey:'userId',
        as:'user',
      });
      Appointment.belongsTo(models.Pet,{
        foreignKey:'petId',
        as:'pet',
      });
      Appointment.belongsTo(models.Vet,{
        foreignKey:'vetId',
        as:'vet',
      });
      Appointment.belongsTo(models.Groomer,{
        foreignKey:'groomerId',
        as:'groomer',
      });
    }
  }
  Appointment.init({
    id:{
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true,
    },
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    petId:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    vetId:{
      type: DataTypes.INTEGER,
      allowNull:true,
    },
    groomerId:{
      type: DataTypes.INTEGER,
      allowNull:true,
    },
    serviceType:{
      type: DataTypes.ENUM('Vet','Grooming'),
      allowNull: false,
    },
    appointmentDate: {
      type: DataTypes.DATE,
      allowNull:false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull:true,
    },
    status:{
      type: DataTypes.ENUM('pending','confirmed','cancelled','completed','updated'),
      defaultValue:'pending',
    },
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};