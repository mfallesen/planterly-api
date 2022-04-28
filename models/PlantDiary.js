const { Schema, model, SchemaType } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const diarySchema = new Schema({
  _id: {
    type: String,
    unique: true,
    default: uuidv4,
  },
  diaryOwner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  plantEntires: [
    {
      type: Schema.Types.ObjectId,
      ref: "Plant",
    },
  ],
  //   Needs to relate to the user it belongs to and contain both the generic plant inof as well as the user specific.
});

const PlantDiary = model("PlantDiary", diarySchema);

module.exports = PlantDiary;
