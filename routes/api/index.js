const router = require("express").Router();

const userRoutes = require("./user-routes");
const diaryRoutes = require("./diary-routes");

router.use("/user", userRoutes);
router.use("/user/:id", diaryRoutes);

module.exports = router;
