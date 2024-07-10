const Controller = require("../controllers");
const authentication = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(authentication);

router.use(require("./user"));

module.exports = router;
