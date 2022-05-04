const { Schema, model, SchemaType } = require("mongoose");

const diarySchema = new Schema({
  diaryName: {
    type: String,
    required: true,
    default: "My Fist Plant Diary",
  },
  diaryOwner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  plantEntires: [
    {
      type: Schema.Types.ObjectId,
      ref: "Plant",
      required: false,
    },
  ],
  //   Needs to relate to the user it belongs to and contain both the generic plant inof as well as the user specific.
});

const PlantDiary = model("PlantDiary", diarySchema);

module.exports = PlantDiary;
