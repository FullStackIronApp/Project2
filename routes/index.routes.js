const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  //API connection

  const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.API_AUTH,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      res.render("index", { movies: json.results, userInSession: req.session.currentUser });
    })
    .catch((err) => console.error("error:" + err));
});

module.exports = router;
