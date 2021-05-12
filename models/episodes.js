'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class episodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        models.episodes.belongsTo(models.Formations,{
            foreignKey:{
                allowNull: false
            }
        })
    }
  };
  episodes.init({
    titre: DataTypes.STRING,
    discr: DataTypes.STRING,
    url: DataTypes.STRING,
    idForm: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'episodes',
  });
  return episodes;
};