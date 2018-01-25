const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const membersController = require("../../controllers/membersController");
const authenticate = require("../../middlewares/authenticate");

router.use(authenticate);
//matches /api/members
router.route("/")
  .get(usersController.getMembers)
  .post(membersController.add);

router.route("/:id")
  .get(membersController.getActivities)
  .delete(membersController.remove);

module.exports = router;