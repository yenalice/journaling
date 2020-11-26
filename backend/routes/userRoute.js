const router = require("express").Router(); // express router
let userModel = require("../models/userModel");
var sanitize = require("express-mongo-sanitize");
// get user

// TODO: make sure 1) email is valid, 2) username is not taken, 3) confirm password === password

// create user
router.route("/").post((req, res) => {
  const email = sanitize(req.body.email);
  const username = sanitize(req.body.username);
  const password = sanitize(req.body.password);

  const newUser = new userModel({ email, username, password });

  newUser
    .save()
    .then(() => res.json("New user added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
