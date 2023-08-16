const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const mongoose = require('mongoose');
const { profile } = require("console");
const fileUploader = require("../config/cloudinary.config.js");
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");


router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", { userInSession: req.session.currentUser });
});

router.post("/profile", (req, res) => {
  const { email, username, password, profileUrl } = req.body;
});

router.get("/profile/:id/edit",isLoggedIn, async (req, res) => {

  try {
    const { id } = req.params;

    const profile = await User.findById(id);

    res.render('profile', { profile: profile, userInSession: req.session.currentUser });
  } catch (error) {
    console.error(error);
  }
});


router.post("/profile/:id/edit", fileUploader.single("profileUrl"), (req, res, next) => {
  const { id } = req.params;
  const profileUrl = req.session.currentUser.profileUrl;
  const { username, email } = req.body;
  User.findByIdAndUpdate(id, { username: username, email: email, profileUrl: req.file?.path || profileUrl }, { new: true })
    .then((updatedUser) => {
      req.session.currentUser = updatedUser;
      console.log(updatedUser);
      res.redirect(`/profile`);
    })
    .catch((err) => {
      next(err)
    })
});


router.post("/profile/:id/delete", (req, res) => {
  const { id } = req.params;

  User.findByIdAndRemove(id)
    .then((data) => {
      console.log(data);
      res.redirect("/signup");
    })
    .catch((err) => console.log(err));
});


module.exports = router;