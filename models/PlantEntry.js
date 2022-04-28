const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userOwnedPlantSchema = new Schema({
  _id: {
    type: String,
    unique: true,
    default: uuidv4,
  },
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
