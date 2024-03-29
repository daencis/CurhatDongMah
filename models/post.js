'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Mood);
      Post.belongsTo(models.User);
    }
  };
  Post.init({
    content: DataTypes.STRING,
    like: DataTypes.INTEGER,
    dislike: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    MoodId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};