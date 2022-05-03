// =======EXAMPLE=========

const router = require("express").Router();
const { createDiary } = require("../../controllers/diary-controller");

// // /api/users
router.route("/createDiary").post(createDiary);
// router.route("/login").post(loginUser);

module.exports = router;
