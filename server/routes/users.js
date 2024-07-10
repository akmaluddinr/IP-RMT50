const UserController = require("../controllers/user");
const router = require("express").Router();

router.post("/users/add-profile", UserController.addProfile);
router.get("/users", UserController.getAllUsers);
router.get("/users/:userId", UserController.getProfileById);

module.exports = router;
