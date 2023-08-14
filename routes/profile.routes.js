const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const mongoose = require('mongoose');

router.get("/profile", (req, res)=>{
    res.render("profile", {userInSession: req.session.currentUser});
});

router.post("/profile", (req, res)=>{
    const {email, username, password, profileUrl} = req.body;
})

module.exports = router;