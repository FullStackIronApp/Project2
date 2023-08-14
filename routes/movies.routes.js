const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");
const Review = require("../models/Review.model");

router.get("/movies", (req, res) => {
  Movie.find()
    .then((movies) => {
      res.render("movies", { movies });
    })
    .catch((error) => console.log(error));
});

router.get("/movies/create", (req, res) => {
  res.render("movies-create");
});

router.post("/movies/create", (req, res, next) => {
  const { title, year, genre, director, movieImg, content, score } = req.body;

  Review.create({
    content,
    score,
    // createdBy:  req.session.currentUser.username, check later if is working after session
    })
    .then((reviewFromDB) => {
      console.log(reviewFromDB);
      Movie.create({
        title,
        year,
        genre,
        director,
        movieImg,
        reviews: [reviewFromDB],
        score,
      });
    })
    .then((result) => {
      console.log("Movie created", result);
      res.redirect("/movies");
    })
    .catch((err) => next(err));
});



module.exports = router;