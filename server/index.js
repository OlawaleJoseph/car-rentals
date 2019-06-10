import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.URI, { useNewUrlParser: true })
.then(() => console.log("Connected to DB"))
.catch(err =>  console.log(err));


const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
