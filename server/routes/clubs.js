const ClubController = require("../controllers/clubs");
const { authorization } = require("../middlewares/authorization");

const router = require("express").Router();

router.get("/clubs/leagues", ClubController.getLeagues);
router.get("/clubs/league/:leagueId", ClubController.getClubs);
router.post("/clubs/my-clubs", ClubController.addClub);
router.get("/clubs/my-clubs", ClubController.getMyClubs);
router.get("/clubs/:clubId", ClubController.getClubById);
router.delete(
  "/clubs/my-clubs/:id",
  authorization,
  ClubController.deleteClubById
);
router.get("/gemini", ClubController.gemini);

module.exports = router;
