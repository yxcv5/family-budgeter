const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router.route("/signup")
  .post(usersController.signUser);

// Matches with "/api/users/login"
router.route("/login")
  .post(usersController.logUser);

module.exports = router;