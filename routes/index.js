const router = require("express").Router();
const userRoutes = require("./api");

router.use("/api", userRoutes);

router.use((req, res) => {
  console.log(req.body);
  return res.send("Wrong route!");
});

module.exports = router;
