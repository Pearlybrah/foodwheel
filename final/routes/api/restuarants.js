const express = require("express");
const router = express.Router();

//Restuarant Model
const Restaurant = require("../../models/Restuarant");

// @route GET api/items
// @desc GET All Items
// @access Public
router.get("/", (req, res) => {
  Restaurant.find()
    .sort({ date: -1 })
    .then(restuarant => res.json(restuarant));
});

// @route POST api/items
// @desc Create an Item
// @access Public
router.post("/", (req, res) => {
  const newRestuarant = new Restaurant({
    name: req.body.name
    //add more fields here
  });
  newRestuarant.save().then(restuarant => res.json(restuarant));
});

// @route DELETE api/items
// @desc Delete an Item
// @access Public
router.delete("/:id", (req, res) => {
  Restaurant.findById(req.params.id).then(restuarant =>
    restuarant
      .remove()
      .then(() =>
        res
          .json({ success: true })
          .catch(err => res.status(404).json({ success: false }))
      )
  );
});

module.exports = router;
