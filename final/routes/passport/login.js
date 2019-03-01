const express = require("express");
const passport = require("passport");
const router = express.Router();

const User = require("../../models/User");
/*
router.get("/users/:id", id => {
  id.find(id !== User._id).then();
});
*/
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  }),
  (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect("/users/" + req.user.username);
  }
);
