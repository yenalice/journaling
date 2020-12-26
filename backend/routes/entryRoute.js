const router = require("express").Router(); // express router
let EntryModel = require("../models/entryModel");
var sanitize = require("express-mongo-sanitize");
var mongoose = require("mongoose");

/* ----- create new entry ----- */
router.route("/").post((req, res) => {
  // TODO: sanitize
  const username = req.body.username;
  const title = req.body.title;
  const text = req.body.text;

  const newEntry = new EntryModel({ username, title, text });

  newEntry
    .save()
    .then(() => {
      res.json({
        success: "Entry added!",
        _id: mongoose.Types.ObjectId(newEntry.id),
      });
    })
    .catch((err) => res.status(400).json(err));
});

/* ----- get request for all entries belonging to user ----- */
router.route("/").get((req, res) => {
  //const { user } = req.query.user;

  // TODO: support multiple users

  EntryModel.find({ username: "yenalice" })
    .then((entry) => res.json(entry))
    .catch((err) => res.status(400).json(err));
});

/* ----- get request to specific entry ----- */
router.route("/:id").get((req, res) => {
  const id = req.params.id;

  EntryModel.findById(id)
    .then((entry) => res.json(entry))
    .catch((err) => res.status(400).json(err));
});

/* ----- modify by id ----- */
router.route("/:id").post((req, res) => {
  const id = req.params.id;

  EntryModel.findById(id)
    .then((entry) => {
      entry.username = "yenalice";
      entry.title = req.body.title;
      entry.text = req.body.text;

      entry
        .save()
        .then(() => res.json("Entry updated"))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

/* ----- delete a specific entry ----- */
router.route("/:id").delete((req, res) => {
  EntryModel.findByIdAndDelete(req.params.id)
    .then(() => res.json("Entry deleted"))
    .catch((err) => res.status(400).json(err));
});

/* ----- delete multiple specified entries ----- */
router.route("/delete-multiple/:ids").delete(function (req, res) {
  const ids = String(req.params.ids).split(",");
  EntryModel.deleteMany({
    _id: {
      $in: ids,
    },
  })
    .then(() => res.json("Selected entries deleted!"))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
