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
  username: {
    type: String,
    required: [true, "Username field is empty"]
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
  isAdmin: Boolean,
  banStatus: Boolean
});

exports = mongoose.model("User", userSchema);
