const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// User Model
const Project = require("../../models/Project");
// Middlewares
const { auth } = require("../../middleware/auth");

// Create new project
router.post("/create-new-project", auth, (req, res) => {
  const project = new Project(req.body);
  project.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      project: doc,
    });
  });
});

// Get projects
router.get("/get-projects", (req, res) => {
  Project.find({}, (err, projects) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(projects);
  });
});

// Get project by id
router.get("/get-project-by-id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Project.find({
    _id: { $in: items },
  }).exec((err, docs) => {
    return res.status(200).send(docs);
  });
});

// Edit project
router.put("/edit-project/:id", (req, res) => {
  Project.findOneAndUpdate({ _id: req.params.id }, req.body, (err, doc) => {
    if (err) res.json({ success: false, err });
    return res.status(200).send({ success: true, doc });
  });
});

// Delete project
router.delete("/delete-project/:id", (req, res) => {
  Project.remove({
    _id: req.params.id,
  })
    .then(deletedProject => {
      res.status(200).send({ success: true, deletedProject: deletedProject });
    })
    .catch(err => {});
});

module.exports = router;
