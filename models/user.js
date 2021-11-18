'use strict';
const bcrypt = require('bcryptjs')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post)
      User.hasOne(models.Profile)
    }
  };
  User.init({
    username: {type:DataTypes.STRING,
    validate:{
      notEmpty:{
        msg: "Username kosong, kasih input dong"
      }
    }
    },
    email: {type:DataTypes.STRING,
    validate:{
      isEmail:{
        msg: "Input email yang bener dong"
      }
    }
    },
    password: {type:DataTypes.STRING,
    validate:{
      notEmpty:{
        msg: "Passwordnya kosong kaya hati aku"
      }
    }
    }
  }, {
    hooks:{
      beforeCreate (instance, option) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};