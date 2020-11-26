const router = require("express").Router(); // express router
let EntryModel = require("../models/entryModel");
var sanitize = require("express-mongo-sanitize");

// post entry to database on press of create button
router.route("/new").post((req, res) => {
  const username = sanitize(req.body.username);
  const title = sanitize(req.body.title);
  const text = sanitize(req.body.text);

  const newEntry = new EntryModel({ username, title, text });

  newEntry
    .save()
    .then(() => res.json("Entry added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// get request to entry
router.route("/:id").get((req, res) => {
  EntryModel.findById(req.params.id)
    .then((entry) => res.json(entry))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
