const router = require("express").Router(); // express router
let userModel = require("../models/userModel");
var sanitize = require("express-mongo-sanitize");
const { check, validationResult } = require("express-validator/check");

// TODO: express validator, jwt, etc.

// get user (login)
router.route("/").get((req, res) => {
  const { username } = req.params;

  userModel
    .find({ username })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// TODO: make sure 1) email is valid, 2) username is not taken, 3) confirm password === password

// create user (signup)
router.route("/").post((req, res) => {
  /*
  const email = sanitize(req.body.email);
  const username = sanitize(req.body.username);
  const password = sanitize(req.body.password);
  */

  // TODO: sanitize after everything is working!!
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new userModel({ email, username, password });

  newUser
    .save()
    .then(() => res.json("New user added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
