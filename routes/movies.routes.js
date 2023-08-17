const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");
const Review = require("../models/Review.model");
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");
const fileUploader = require("../config/cloudinary.config.js");

router.get("/movies", isLoggedIn, (req, res) => {
  Movie.find()
    .populate("reviews")
    .then((movies) => {
      res.render("movies", { movies, userInSession: req.session.currentUser });
    })
    .catch((error) => console.log(error));
});

router.get("/movies/create", isLoggedIn, (req, res) => {
  res.render("movies-create", {userInSession: req.session.currentUser});
});

router.post(
  "/movies/create", fileUploader.single("movieImg"), isLoggedIn,(req, res, next) => {
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

router.get("/movies/:userId", isLoggedIn, (req, res, next) => {
  const { userId } = req.params;

  Movie.find({ uploadedBy: userId })
    .populate("reviews")
    .then((movies) => {
      res.render("user-movies", { movies, userInSession: req.session.currentUser });
    })
    .catch((err) => next(err));
});

router.get("/movie/:movieId", isLoggedIn, (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
  .populate("uploadedBy")
  .populate("reviews")
  .then((movie) => {
    console.log(movie);
    const isTheOwner = (req.session.currentUser.username == movie.uploadedBy.username)
    console.log("isTheOwner: ", isTheOwner);
    res.render("movie-details.hbs", { movie, userInSession: req.session.currentUser, isTheOwner });
    })
    .catch((err) => next(err));
});

router.post("/movie/:movieId", (req,res,next)=>{
  const {movieId} = req.params
  const {content, score} = req.body

  if (!content || !score){

  Movie.findById(movieId)
  .populate("uploadedBy")
  .populate("reviews")
  .then((movie) => {
    console.log(movie);
    const isTheOwner = (req.session.currentUser.username == movie.uploadedBy.username)
    console.log("isTheOwner: ", isTheOwner);
    res.render("movie-details", { movie, userInSession: req.session.currentUser, isTheOwner, errorMessage: 'All fields are mandatory. Please provide your review, and score.' });
    })
  .catch((err) => next(err));
    
    return;
  }

  Review.create({
    content,
    score,
    createdBy: req.session.currentUser.username,
  })
  .then((result) => {
    console.log("Review created", result);
    return Movie.findByIdAndUpdate(movieId, { $push: { reviews: result._id}}, { new: true })
  })
  .then((newMovie) => {
    console.log("new update", newMovie);
    res.redirect(`/movie/${newMovie._id}`)
  })
  .catch((err) => next(err));
})

router.post("/movie/:movieId/delete", (req,res,next)=>{
  const {movieId} = req.params

  Movie.findByIdAndRemove(movieId)
  .then((data) => {
    console.log("deleted movie:", data);
    res.redirect("/movies");
  })
  .catch((err) => next(err));
});





module.exports = router;
