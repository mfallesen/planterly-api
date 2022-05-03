const { Plant, PlantDiary, GenericPlant } = require("../models");

const diaryController = {
  // Create a User Diary
  createDiary(req, res) {
    PlantDiary.create(req.body)
      .then((DiaryInfo) => {
        res.json(DiaryInfo);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = diaryController;

// createUser(req, res) {
//     User.create(req.body)
//       .then((dbUserData) => {
//         res.json(dbUserData);
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
