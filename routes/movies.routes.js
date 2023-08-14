const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');

router.get("/movies/create", (req, res) => {
    res.render('movies.create')
  })

  router.post('movies/create', async (req, res, next) => {
    const { title, year, genre, director, movieImg, review, score } = req.body;
    Review.create({

            content: review,
            score: score,
            createdBy: req.session.currentUser.username // check later if is working after session
        })

        .then((reviewFromDB)=>{
            Movie.create({
                title,
                year,
                genre,
                director,
                movieImg,
                reviews: [reviewFromDB._id],
                score,
            
            })
            .then((res)=>{
                console.log("Movie created", res)
                res.redirect('/movies/create');
            })
            .catch(err => next(err))
        })
        .catch(err => next(err))
    })
  
  module.exports = router;