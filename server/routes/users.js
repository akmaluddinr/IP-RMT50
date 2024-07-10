const UserController = require("../controllers/user");
const router = require("express").Router();

router.post("/users/add-profile", UserController.addProfile);
router.get("/users", UserController.getAllUsers);

module.exports = router;
