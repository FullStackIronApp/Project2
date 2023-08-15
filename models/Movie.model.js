const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const movieSchema = new Schema(
  {
    title: {
        type: String,
        required: true,
        unique: true
    },
    year: {
        type: Number,
        min: 1900,
        max: new Date().getFullYear()
    },
    genre: {
        type: [String],
        enum: ['drama', 'comedy', 'action', 'animation', "adventure", "fantasy", "horror", "musicals", "mystery", "romance", "science fiction", "sports", "thriller"]
    },
    director: {
        type: String
    },
    uploadedBy : { type: Schema.Types.ObjectId, ref: "User" }, //check later if this is gonna be enough
    score: {
        type: [Number]
    },
    movieImg: {
        type: String,
        required: true
    },
    reviews:  [{ type: Schema.Types.ObjectId, ref: "Review" }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Movie = model("Movie", movieSchema);

module.exports = Movie;
