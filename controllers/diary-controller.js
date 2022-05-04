const { Plant, PlantDiary, GenericPlant, User } = require("../models");

const diaryController = {
  // Create a User Diary
  createDiary(req, res) {
    PlantDiary.create(req.body)
      .then((DiaryInfo) => {
        console.log(DiaryInfo);

        res.json(DiaryInfo);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = diaryController;
