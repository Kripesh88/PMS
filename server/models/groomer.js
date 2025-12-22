'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Groomer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Groomer.hasMany(models.Appointment,{
        foreignKey: 'appointmentId',
        as:'appointment'
      });
    }
  }
  Groomer.init({
    id:{
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    specialization:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    experienceYears: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Groomer',
  });
  return Groomer;
};