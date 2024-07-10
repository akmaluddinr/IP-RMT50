"use strict";
const { MyClub } = require("../models");

async function authorization(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const club = await MyClub.findByPk(id);

    if (!club) throw { name: "dataNotFound" };
    if (userId === club.userId) {
      next();
    } else {
      throw { name: "forbidden" };
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  authorization,
};
