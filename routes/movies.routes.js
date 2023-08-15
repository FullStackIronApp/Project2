const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");
const Review = require("../models/Review.model");
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");
const fileUploader = require("../config/cloudinary.config.js");

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

router.post(
  "/movies/create",
  fileUploader.single("movieImg"),
  isLoggedIn,
  (req, res, next) => {
    const { title, year, genre, director, content, score } = req.body;

    Review.create({
      content,
      score,
      createdBy: req.session.currentUser.username,
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
  }
);

router.get("/movies/:userId", (req, res, next) => {
  const { userId } = req.params;

  Movie.find({ uploadedBy: userId })
    .then((movies) => {
      res.render("user-movies", { movies });
    })
    .catch((err) => next(err));
});

router.get("/movie/:movieId", (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .populate("uploadedBy")
    .populate("reviews")
    .then((movie) => {
      console.log(movie);
      res.render("movie-details.hbs", { movie });
    })
    .catch((err) => next(err));
});

router.post("/movie/:movieId", (req,res,next)=>{
  const movieId = req.params
  const {content, score} = req.body

  Review.create({
    content,
    score,
    createdBy: req.session.currentUser.username,
  })
  .then((result) => {
    console.log("Review created", result);
    return Movie.findByIdAndUpdate(movieId.movieId, { $push: { reviews: result._id}}, { new: true })
  })
  .then((newMovie) => {
    console.log("new update", newMovie);
    res.redirect(`/movie/${newMovie._id}`)
  })
  .catch((err) => next(err));
})

module.exports = router;
