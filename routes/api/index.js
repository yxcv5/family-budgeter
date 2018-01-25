const router = require("express").Router();
const plannerRoutes = require("./planner");
const userRoutes = require("./users");
const memberRoutes = require("./members");

router.use("/planner", plannerRoutes);
router.use("/users", userRoutes);
router.use("/members", memberRoutes);

module.exports = router;
