"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  UserProfile.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "First name is required" },
          notEmpty: { msg: "First name is required" },
        },
      },
      lastName: DataTypes.STRING,
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Gender is required" },
          notEmpty: { msg: "Gender is required" },
        },
      },
      cityOfOrigin: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "City of origin is required" },
          notEmpty: { msg: "City of origin is required" },
        },
      },
      description: DataTypes.STRING,
      position: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Position is required" },
          notEmpty: { msg: "Position is required" },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User ID is required" },
          notEmpty: { msg: "User ID is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "UserProfile",
    }
  );
  return UserProfile;
};
