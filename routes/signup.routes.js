const User = require('../models/User.model');
const express = require('express')
const router = express.Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const mongoose = require('mongoose')

router.get("/signup", (req, res, next)=>{
    res.render("signup");
});

router.post("/signup", (req, res, next)=>{
    const {email, username, password, profileUrl} = req.body;

    if (!email || !username || !password){
        res.render("signup", {errorMessage: 'All fields are mandatory. Please provide your username, email and password.'});
        return;
    }

    bcryptjs
    .genSalt(saltRounds)
    .then(salt =>bcryptjs.hash(password, salt))
    .then(hashedPassword =>{
        return User.create({
            email,
            username,
            password: hashedPassword
        })
    })
    .then(error=> {
        if (error instanceof mongoose.Error.ValidationError) {
            res.render('signup', { errorMessage: error.message });
          } else {
            res.redirect("/")
            next(error);
          }

    });
})
module.exports = router;