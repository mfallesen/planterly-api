const { Schema, model } = require("mongoose");

const genericPlantSchema = new Schema(
  {
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
