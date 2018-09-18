const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// User Model
const Advertisement = require("./../../models/Advertisement");
const Area = require("./../../models/Area");
const Direction = require("./../../models/Direction");
// Middlewares
const { auth } = require("../../middleware/auth");

// Create new ad
router.post("/create-new-ad", auth, (req, res) => {
  const advertisement = new Advertisement(req.body);
  advertisement.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      advertisement: doc,
    });
  });
});

// Get ads
router.get("/get-advertisements", (req, res) => {
  Advertisement.find()
    .populate("user")
    .populate("project")
    .populate("realEstate")
    .populate("area")
    .exec((err, advertisements) => {
      if (err) return res.status(400).send(err);
      res.send(advertisements);
    });
});

// Get and sort ads
// ?sortBy=postDate&order=desc&limit=4&skip=5
router.get("/get-sort-advertisements", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;

  Advertisement.find()
    .populate("user")
    .populate("project")
    .populate("realEstate")
    .populate("area")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, advertisements) => {
      if (err) return res.status(400).send(err);
      res.send(advertisements);
    });
});

// Get ad by id
router.get("/get-ad-by-id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Advertisement.find({
    _id: { $in: items },
  })
    .populate("user")
    .populate("project")
    .populate("realEstate")
    .populate("area")
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

// Get ads to properties
router.post("/properties", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 64;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      }
      else if (key === "title") {
        // let regex = RegExp([".*^", req.body.filters[key], "$.*"].join(""), "i");

        let val = ".*" + req.body.filters[key] + ".*";

        findArgs[key] = {'$regex' : val, $options: 'i'}
        
      }
      else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  // console.log("&&&&&&&", findArgs)
  Advertisement.find(findArgs)
    .populate("user")
    .populate("project")
    .populate("realEstate")
    .populate("area")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, advertisements) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        size: advertisements.length,
        advertisements: advertisements,
      });
    });
});

// Edit ad
router.put("/edit-ad/:id", (req, res) => {
  Advertisement.findOne({
    _id: req.params.id,
  })
    .then(advertisement => {
      advertisement.title = req.body.title;
      advertisement.area = req.body.area;
      advertisement.address = req.body.address;
      advertisement.direction = req.body.direction;
      advertisement.numberOfBedrooms = req.body.numberOfBedrooms;
      advertisement.numberOfFloors = req.body.numberOfFloors;
      advertisement.price = req.body.price;
      advertisement.images = req.body.images;
      advertisement.postDate = req.body.postDate;
      advertisement.expiredDate = req.body.expiredDate;

      advertisement.save().then(savedAdvertisement => {
        res
          .status(200)
          .send({ success: true, savedAdvertisement: savedAdvertisement });
      });
    })
    .catch(err => {});
});

// Delete ad
router.delete("/delete-ad/:id", (req, res) => {
  Advertisement.remove({
    _id: req.params.id,
  })
    .then(deletedAdvertisement => {
      res
        .status(200)
        .send({ success: true, deletedAdvertisement: deletedAdvertisement });
    })
    .catch(err => {});
});

// create advertisement area
router.post("/areas/create-new-area", auth, (req, res) => {
  const area = new Area(req.body);
  area.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      area: doc,
    });
  });
});

// get advertisement area
router.get("/areas/get-areas", (req, res) => {
  Area.find({}, (err, areas) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(areas);
  });
});

// get advertisement area by id
router.get("/areas/get-area-by-id", (req, res) => {
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

// edit advertisement area
router.put("/areas/edit-area/:id", (req, res) => {
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

// delete advertisement area
router.delete("/areas/delete-area/:id", (req, res) => {
  Area.remove({
    _id: req.params.id,
  })
    .then(deletedArea => {
      res.status(200).send({ success: true, deletedArea: deletedArea });
    })
    .catch(err => {});
});

// create advertisement direction
router.post("/directions/create-new-direction", auth, (req, res) => {
  const direction = new Direction(req.body);
  direction.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      area: doc,
    });
  });
});

// get advertisement directions
router.get("/directions/get-directions", (req, res) => {
  Direction.find({}, (err, directions) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(directions);
  });
});

// get advertisement direction by id
router.get("/directions/get-direction-by-id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Direction.find({
    _id: { $in: items },
  }).exec((err, docs) => {
    return res.status(200).send(docs);
  });
});

// edit advertisement direction
router.put("/directions/edit-direction/:id", (req, res) => {
  Direction.findOne({
    _id: req.params.id,
  })
    .then(direction => {
      direction.name = req.body.name;

      direction.save().then(savedDirection => {
        res.status(200).send({ success: true, savedDirection: savedDirection });
      });
    })
    .catch(err => {});
});

// delete advertisement direction
router.delete("/directions/delete-area/:id", (req, res) => {
  Direction.remove({
    _id: req.params.id,
  })
    .then(deletedDirection => {
      res.status(200).send({ success: true, deletedDirection: deletedDirection });
    })
    .catch(err => {});
});

module.exports = router;
