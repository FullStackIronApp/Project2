const express = require('express');
const router = express.Router();
const User = require('../models/User.model');


router.get("/login", (req, res) => {
    res.render('login')
  })

  router.post("/login", (req,res,next)=>{
    const { email, username, password } = req.body;
      res.redirect("/")
      if (email === '' || username === '' || password === '' ) {
          return res.render('/login', {
            errorMessage: 'Please enter your email, username and password to login.'
          });
        }

        User.findOne({ username })
      .then(user => {
        if (!user) {
          console.log("Username not registered. ");
          res.render('/login', { errorMessage: 'User not found' });
          return;
        } else if (bcryptjs.compareSync(password, user.password)) {
          req.session.currentUser = user;
        res.redirect('/');
        } else {
          console.log("Incorrect password. ");
          res.render('/login', { errorMessage: 'Incorrect password.' });
        }
      })
      .catch(error => next(error));
    })

    module.exports = router
