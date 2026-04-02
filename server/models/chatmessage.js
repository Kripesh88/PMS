'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChatMessage.init({
    id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
    },
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    role:{
      type:DataTypes.ENUM('user','assistant'),
      allowNull:false
    },
    message:{ 
      type: DataTypes.TEXT,
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'ChatMessage',
  });
  return ChatMessage;
};