import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/users";

dotenv.config();

mongoose
  .connect(process.env.URI, { useNewUrlParser: true })
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", userRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
