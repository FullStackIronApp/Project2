const Movie = require('../models/Movie.model');
const express = require('express')
const router = express.Router();

router.get("/movies", (req, res)=>{
    Movie.find()
    .then((movies)=>{
        res.render("movies", movies);
    })
    .catch((error)=>console.log(error));
})
