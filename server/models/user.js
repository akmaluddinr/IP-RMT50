"use strict";
const { hashSync } = require("bcryptjs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile, { foreignKey: "userId" });
      User.hasMany(models.MyClub, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Username already exists" },
        validate: {
          notNull: { msg: "Username is required" },
          notEmpty: { msg: "Username is required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email already exists" },
        validate: {
          notNull: { msg: "Email is required" },
          notEmpty: { msg: "Email is required" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          passRequirement(password) {
            if (!password) throw new Error("Password is required");
            else if (password.length < 5)
              throw new Error("Password must at least 5 characters length");
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((e) => {
    const hashedPassword = hashSync(e.password);
    e.password = hashedPassword;
  });
  return User;
};
