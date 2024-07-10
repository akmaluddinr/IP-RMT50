const ClubController = require("../controllers/clubs");

const router = require("express").Router();

router.get("/clubs/league/:leagueId", ClubController.getClubs);
router.post("/clubs/my-clubs", ClubController.addClub);

module.exports = router;
