const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const mongoose = require('mongoose');
const { profile } = require("console");

router.get("/profile", (req, res)=>{
    res.render("profile", {userInSession: req.session.currentUser});
});

router.post("/profile", (req, res)=>{
    const {email, username, password, profileUrl} = req.body;
});

router.get("/profile/:id/edit", async (req,res)=>{

    try {
      const { id } = req.params;

      const profile = await User.findById(id);

      res.render('profile/edit-profile', { profile: profile, userInSession: req.session.currentUser}); 
  } catch (error) {
      console.error(error);
  }
});


router.post("/profile/:id/edit", async (req,res)=>{
  try {
    const { id } = req.params;
    const { username, email, profileUrl } = req.body;

    const updatedProfile = await User.findByIdAndUpdate(id, { username: username, email:email, profileUrl: profileUrl }, { new: true });
    req.session.currentUser = updatedProfile;
    console.log(updatedProfile);
    res.redirect(`/profile`);
} catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
}
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