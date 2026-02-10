'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sector extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Sector.init(
    {
      name: DataTypes.STRING,
      coords: DataTypes.STRING,
      shape: DataTypes.STRING,
      area: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Sector',
    },
  );
  return Sector;
};
