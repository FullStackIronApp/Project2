const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    year: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear(),
    },
    genre: {
      type: [String],
      enum: [
        "drama",
        "comedy",
        "action",
        "animation",
        "adventure",
        "fantasy",
        "horror",
        "musicals",
        "mystery",
        "romance",
        "science fiction",
        "sports",
        "thriller",
      ],
    },
    director: {
      type: String,
    },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" }, //check later if this is gonna be enough
    score: {
      type: [Number],
    },
    movieImg: {
      type: String,
      required: true,
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

movieSchema.virtual("averageScore").get(function () {
  if (this.reviews.length === 0) {
    return 0; // Return 0 if there are no reviews
  }

  const totalScore = this.reviews.reduce((sum, review) => {
    return sum + review.score;
  }, 0);

  const score = totalScore / this.reviews.length;
  const scoreDecimal = Math.round(score*10)/10
  return scoreDecimal
});

const Movie = model("Movie", movieSchema);

module.exports = Movie;
