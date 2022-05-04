const { Schema, model } = require("mongoose");

const userOwnedPlantSchema = new Schema({
  basicInfo: {
    type: Schema.Types.ObjectId,
    ref: "GenericPlant",
  },
  nickname: {
    type: String,
  },
  location: {
    type: String,
  },
  careInstructions: {
    type: String,
  },
  plantedDate: {
    type: Date,
  },
  lastWateredDate: {
    type: String,
  },
});

const Plant = model("Plant", userOwnedPlantSchema);

module.exports = Plant;
