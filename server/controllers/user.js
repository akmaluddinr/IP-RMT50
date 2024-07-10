"use strict";

const { User, UserProfile } = require("../models");

class UserController {
  static async addProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const newProfile = await UserProfile.create({
        ...req.body,
        userId: userId,
      });
      res.status(201).json({
        firstName: newProfile.firstName,
        gender: newProfile.gender,
        cityOfOrigin: newProfile.cityOfOrigin,
        position: newProfile.position,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
        include: { model: UserProfile },
      });
      res.json(users);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
