'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pet.belongsTo(models.Breed, {
        foreignKey: 'breedId',
        as: 'breed',
      });

      Pet.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });


      Pet.hasMany(models.Appointment, {
        foreignKey: 'petId',
        as: 'appointments',
      });
      
    }
  }
  Pet.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      breedId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name:{
        type: DataTypes.STRING,
        allowNull:true,
      },
      gender:{
        type:DataTypes.ENUM('male','female'),
        allowNull:true,
      },
      weight:{
        type: DataTypes.FLOAT,
        allowNull:true,
      },
      description:{
        type: DataTypes.TEXT,
        allowNull:true
      },
      medicalHistory:{
        type:DataTypes.TEXT,
        allowNull:true
      },
      },
    {
      sequelize,
      modelName: 'Pet',
    }
  );
  return Pet;
};
