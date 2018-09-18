const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// User Model
const Area = require("./../../models/Area");
// Middlewares
const { auth } = require("./../../middleware/auth");

// Create new area
router.post("/create-new-area", auth, (req, res) => {
  const area = new Area(req.body);
  area.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      area: doc,
    });
  });
});

// Get areas
router.get("/get-areas", (req, res) => {
  Area.find({}, (err, areas) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(areas);
  });
});

// Get area by id
router.get("/get-area-by-id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Area.find({
    _id: { $in: items },
  }).exec((err, docs) => {
    return res.status(200).send(docs);
  });
});

// Edit area
router.put("/edit-area/:id", (req, res) => {
  Area.findOne({
    _id: req.params.id,
  })
    .then(area => {
      area.name = req.body.name;

      area.save().then(savedArea => {
        res.status(200).send({ success: true, savedArea: savedArea });
      });
    })
    .catch(err => {});
});

// Delete area
router.delete("/delete-area/:id", (req, res) => {
  Area.remove({
    _id: req.params.id,
  })
    .then(deletedArea => {
      res.status(200).send({ success: true, deletedArea: deletedArea });
    })
    .catch(err => {});
});

module.exports = router;
