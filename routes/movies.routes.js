const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");
const Review = require("../models/Review.model");
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");
const fileUploader = require('../config/cloudinary.config.js');


router.get("/movies", isLoggedIn, (req, res) => {
  Movie.find()
    .then((movies) => {
      res.render("movies", { movies, userInSession: req.session.currentUser });
    })
    .catch((error) => console.log(error));
});

router.get("/movies/create", isLoggedIn, (req, res) => {
  res.render("movies-create");
});

router.post("/movies/create", fileUploader.single('movieImg'), isLoggedIn, (req, res, next) => {
  const { title, year, genre, director, content, score } = req.body;

  console.log(req.file.path);

  Review.create({
    content,
    score,
    createdBy: req.session.currentUser._id
  })
    .then((reviewFromDB) => {
      console.log(reviewFromDB);
      return Movie.create({
        title,
        year,
        genre,
        director,
        movieImg: req.file.path,
        reviews: [reviewFromDB],
        score,
        uploadedBy: req.session.currentUser._id,
      });
    })
    .then((result) => {
      console.log("Movie created", result);
      res.redirect("/movies");
    })
    .catch((err) => next(err));
});

router.get("/movies/:userId", (req, res, next) => {
  const { userId } = req.params;

  Movie.find( {uploadedBy: userId} )
    .then((movies) => {
      res.render("user-movies", {movies})
    })
    .catch((err) => next(err));
});

module.exports = router;
