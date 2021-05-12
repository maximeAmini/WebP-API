'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Users.hasMany(models.Formations)
    }
  };
  Users.init({
    userName: DataTypes.STRING,
    pass: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};