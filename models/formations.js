'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Formations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        models.Formations.belongsTo(models.Users,{
            foreignKey:{
                allowNull: false
            }
        })
        models.Formations.hasMany(models.episodes)
    }
  };
  Formations.init({
    titre: DataTypes.STRING,
    discr: DataTypes.STRING,
    date: DataTypes.DATE,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Formations',
  });
  return Formations;
};