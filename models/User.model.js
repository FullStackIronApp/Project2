const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    username:{
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Please use a valid username"]
    },
    password: {
      type: String,
      required: [true, "Password is required."]
    },
    profileUrl: {
      type: String
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
