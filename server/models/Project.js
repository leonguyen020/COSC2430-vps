const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  owner: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
    maxlength: 100,
  },

  category: {
    type: String,
    required: true,
    maxlength: 100,
  },

  totalArea: {
    type: Number,
    required: true,
  },

  startYear: {
    type: Date,
  },

  endYear: {
    type: Date,
  },
});

module.exports = mongoose.model("projects", ProjectSchema);
