'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mood.belongsTo(models.Post)
    }
  };
  Mood.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mood',
  });
  return Mood;
};