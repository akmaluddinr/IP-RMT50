"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyClub extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyClub.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  MyClub.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Club name is required" },
          notEmpty: { msg: "Club name is required" },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Image URL is required" },
          notEmpty: { msg: "Image URL is required" },
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
      clubId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: { msg: "Club already added" },
        validate: {
          notNull: { msg: "Club ID is required" },
          notEmpty: { msg: "Club ID is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "MyClub",
    }
  );
  return MyClub;
};
