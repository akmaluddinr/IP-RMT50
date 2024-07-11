"use strict";
const { compareSync } = require("bcryptjs");
const { signToken } = require("../helpers/jwt");
const { User, UserProfile } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      if (!username) throw { name: "usernameRequired" };
      if (!email) throw { name: "invalidInput" };
      if (!password) throw { name: "invalidInput" };

      const user = await User.findOne({ where: { email } });
      if (user) throw { name: "alreadyRegistered" };

      const newUser = await User.create({
        username,
        email,
        password,
      });

      await UserProfile.create({
        userId: newUser.id,
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

  static async loginGoogle(req, res, next) {
    try {
      console.log(req.body);
      const { googleToken } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        hooks: false,
        defaults: {
          username: payload.given_name,
          email: payload.email,
          password: Math.random().toString(),
        },
      });
      const token = signToken({ id: user.id });
      res.status(created ? 201 : 200).json({ access_token: token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
