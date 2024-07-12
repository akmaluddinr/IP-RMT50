"use strict";

const { MyClub } = require("../models");
const axios = require("axios");
const gemini = require("../helpers/gemini");

class ClubController {
  static async getLeagues(req, res, next) {
    try {
      const array = [39, 140, 135, 78, 61, 88];
      const leagues = [];
      for (let i = 0; i < array.length; i++) {
        const { data } = await axios({
          url: "https://api-football-v1.p.rapidapi.com/v3/standings",
          headers: {
            "x-rapidapi-key":
              "3f7e6f7025mshc5c71cdcd34363bp12e7fdjsn8ccf91420ba7",
          },
          params: {
            league: array[i],
            season: 2023,
          },
        });
        let league = data.response[0].league;
        leagues.push(league);
      }
      res.json(leagues);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getClubs(req, res, next) {
    try {
      console.log(req.params);
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
      const { clubId, clubName, imgUrl } = req.body;
      const userId = req.user.id;
      const clubs = await MyClub.findAll({ where: { userId } });
      const club = clubs.find((e) => {
        return e.clubId === clubId;
      });
      if (club) throw { name: "alreadyAdded" };

      const addedClub = await MyClub.create({
        name: clubName,
        imgUrl: imgUrl,
        clubId: clubId,
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

  static async getMyClubs(req, res, next) {
    try {
      const userId = req.user.id;
      const myClubs = await MyClub.findAll({
        where: { userId },
      });
      res.json(myClubs);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteClubById(req, res, next) {
    try {
      const { id } = req.params;
      const club = await MyClub.findByPk(id);
      await club.destroy();
      res.json({
        message: `Club ${club.name} was deleted successfully`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async gemini(req, res, next) {
    try {
      const { prompt } = req.body;
      let response = await gemini(prompt);
      res.send(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ClubController;
