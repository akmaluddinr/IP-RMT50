const Controller = require("../controllers");
const authentication = require("../middlewares/authentication");
const router = require("express").Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/login-google", Controller.loginGoogle);

router.use(authentication);

router.use(require("./users"));
router.use(require("./clubs"));

module.exports = router;
