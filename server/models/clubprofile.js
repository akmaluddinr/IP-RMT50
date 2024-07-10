'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClubProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClubProfile.init({
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    founded: DataTypes.DATE,
    stadium: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    address: DataTypes.STRING,
    clubImg: DataTypes.STRING,
    stadiumImg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ClubProfile',
  });
  return ClubProfile;
};