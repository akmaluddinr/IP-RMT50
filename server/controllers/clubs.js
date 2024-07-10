"use strict";

const { MyClub } = require("../models");
const axios = require("axios");

class ClubController {
  static async getClubs(req, res, next) {
    try {
      const { leagueId } = req.params;
      const { data } = await axios({
        url: "https://api-football-v1.p.rapidapi.com/v3/standings",
        headers: {
          "x-rapidapi-key":
            "3f7e6f7025mshc5c71cdcd34363bp12e7fdjsn8ccf91420ba7",
        },
        params: {
          league: leagueId,
          season: 2023,
        },
      });
      const clubsData = data.response[0].league.standings[0];
      const clubs = clubsData.map((e) => {
        return e.team;
      });
      res.json(clubs);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addClub(req, res, next) {
    try {
      const { clubId } = req.body;
      const userId = req.user.id;
      const { data } = await axios({
        url: "https://api-football-v1.p.rapidapi.com/v3/teams",
        headers: {
          "x-rapidapi-key":
            "3f7e6f7025mshc5c71cdcd34363bp12e7fdjsn8ccf91420ba7",
        },
        params: {
          id: clubId,
        },
      });
      const { id, name, logo } = data.response[0].team;

      const addedClub = await MyClub.create({
        name: name,
        imgUrl: logo,
        clubId: id,
        userId: userId,
      });
      res.status(201).json({
        id: addedClub.id,
        name: addedClub.name,
        imgUrl: addedClub.imgUrl,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getClubById(req, res, next) {
    try {
      const { clubId } = req.params;
      const { data } = await axios({
        url: "https://api-football-v1.p.rapidapi.com/v3/teams",
        headers: {
          "x-rapidapi-key":
            "3f7e6f7025mshc5c71cdcd34363bp12e7fdjsn8ccf91420ba7",
        },
        params: {
          id: clubId,
        },
      });
      if (!data) throw { name: "dataNotFound" };
      res.json(data.response[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ClubController;
