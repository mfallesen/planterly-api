const User = require("./User");
const GenericPlant = require("./GenericPlantInfo");
const Plant = require("./PlantEntry");
const PlantDiary = require("./PlantDiary");

module.exports = { User, GenericPlant, Plant, PlantDiary };

// User Plant Obejcts should look like this

// let userPlants = {
//     [
//         {
//             plant_id: "id",
//             plant_name: "plant_name",
//             plant_type: "plant Type",
//         }
//     ]
// }
