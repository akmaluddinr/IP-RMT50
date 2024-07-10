"use strict";
const { compareSync } = require("bcryptjs");
const { signToken } = require("../helpers/jwt");

const { User } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      if (!username) throw { name: "usernameRequired" };
      if (!email) throw { name: "invalidInput" };
      if (!password) throw { name: "invalidInput" };

      const newUser = await User.create({
        username,
        email,
        password,
      });

      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "invalidInput" };
      if (!password) throw { name: "invalidInput" };

      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "invalidEmail" };

      const verifyPassword = compareSync(password, user.password);
      if (!verifyPassword) throw { name: "wrongPassword" };

      const token = signToken({ id: user.id });
      res.json({ access_token: token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
