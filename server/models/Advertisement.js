const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Advertisement = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "projects",
    },

    realEstate: {
      type: Schema.Types.ObjectId,
      ref: "realestates",
    },

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

    price: {
      type: Number,
      required: true,
    },

    contactInfo: {
      type: String,
      required: true,
    },

    images: {
      type: Array,
      default: [],
    },

    postDate: {
      type: Date,
      default: Date.now(),
    },

    expiredDate: {
      type: Date,
    },
    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("advertisements", Advertisement);
