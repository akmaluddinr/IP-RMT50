"use strict";

const { sign, verify } = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

module.exports = {
  signToken: (payload) => {
    return sign(payload, secretKey);
  },
  verifyToken: (token) => {
    return verify(token, secretKey);
  },
};
