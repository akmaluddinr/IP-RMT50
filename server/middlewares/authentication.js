"use strict";
const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) throw { name: "unauthorized" };
    const [type, token] = accessToken.split(" ");

    if (type !== "Bearer") throw { name: "unauthorized" };

    const { id } = verifyToken(token);
    const user = await User.findByPk(id);
    if (!user) throw { name: "unauthorized" };

    req.user = {
      id: user.id,
      role: user.role,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
