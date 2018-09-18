const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// User Model
const RealEstate = require("../../models/RealEstate");
// Middlewares
const { auth } = require("../../middleware/auth");

// Create new real estate
router.post("/create-new-real-estate", auth, (req, res) => {
  const realEstate = new RealEstate(req.body);
  realEstate.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      realEstate: doc,
    });
  });
});

// Get real estates
router.get("/get-real-estates", (req, res) => {
  RealEstate.find({}, (err, realEstates) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(realEstates);
  });
});

// Get real estate by id
router.get("/get-real-estate-by-id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  RealEstate.find({
    _id: { $in: items },
  }).exec((err, docs) => {
    return res.status(200).send(docs);
  });
});

// Edit real estate
router.put("/edit-real-estate/:id", (req, res) => {
  RealEstate.findOneAndUpdate({ _id: req.params.id }, req.body, (err, doc) => {
    if (err) res.json({ success: false, err });
    return res.status(200).send({ success: true, doc });
  });
});

// Delete real estate
router.delete("/delete-real-estate/:id", (req, res) => {
  RealEstate.remove({
    _id: req.params.id,
  })
    .then(deletedRealEstate => {
      res
        .status(200)
        .send({ success: true, deletedRealEstate: deletedRealEstate });
    })
    .catch(err => {});
});

module.exports = router;
