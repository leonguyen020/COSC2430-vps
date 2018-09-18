const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RealEstateSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  area: {
    type: Schema.Types.ObjectId,
    ref: "areas",
  },

  address: {
    type: String,
    required: true,
  },

  direction: {
    type: String,
    required: true,
  },

  numberOfBedrooms: {
    type: Number,
    required: true,
  },

  numberOfFloors: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("realestates", RealEstateSchema);
