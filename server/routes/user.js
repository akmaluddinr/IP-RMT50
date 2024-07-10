const UserController = require("../controllers/user");

const router = require("express").Router();

router.get("/register", UserController.register);

module.exports = router;
