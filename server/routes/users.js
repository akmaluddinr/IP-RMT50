const UserController = require("../controllers/user");
const router = require("express").Router();

router.put("/users/profiles", UserController.editProfile);
router.get("/users", UserController.getAllUsers);
router.get("/users/:userId", UserController.getProfileById);

module.exports = router;
