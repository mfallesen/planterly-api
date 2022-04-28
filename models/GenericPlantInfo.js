const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const genericPlantSchema = new Schema(
  {
    _id: {
      type: String,
      unique: true,
      default: uuidv4,
    },
    name: {
      type: String,
      unique: true,
    },
    basicCare: {
      type: String,
    },
  }
  // Includes plant Name (common) *Add scientific later?
);

const GenericPlant = model("GenericPlant", genericPlantSchema);

module.exports = GenericPlant;
