const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const reviewSchema = new Schema(
  {
    content: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true,
        // enum
    },
    createdBy:  { type: String}
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }

  );
  reviewSchema.virtual("date").get(function () {

    // Parse the input date string
    const dateObj = new Date(this.createdAt);

    // Format the date as "dd-mm-yyyy"
    const date = new Intl.DateTimeFormat('es', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(dateObj);
    
    return date
  });

const Review = model("Review", reviewSchema);

module.exports = Review
