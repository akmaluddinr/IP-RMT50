class UserController {
  static async register(req, res) {
    try {
      res.send({ msg: "THIS IS REGISTER" });
    } catch (error) {
      console.log(error);
    }
  }

  static async login(req, res) {
    try {
      res.send({ msg: "THIS IS LOGIN" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
