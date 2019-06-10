import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  averageRating: {
      type: Number,
      default: 0
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: [8, "At least 8 characters long"],
    max: [20]
  },
  isAdmin: {
      type: Boolean,
      default: false
  },
    banStatus: {
        type: Boolean,
        default: false
    },
});

exports = mongoose.model("User", userSchema);
