import jwt from "jsonwebtoken";
import Joi from "@hapi/joi";
import dotenv from "dotenv";

dotenv.config();

export const updateUserValidation = async (req, res, next) => {
  const updateSchema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required()
      .error(() => {
        res.status(400).send("Invalid user email");
      }),
    isAdmin: Joi.boolean()
      .error(() => {
        res.status(400).send("Invalid admin type");
      }),
    banStatus: Joi.boolean()
        .error(() => {
        res.status(400).send("Invalid ban status type");
      }),
    averageRating: Joi.number()
      .error(() => {
        res.status(400).send("User Rating Input is not a number");
      })
  })
  try {
    await Joi.validate(req.body, updateSchema);
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.send("No token provided");
    }
    const user = await jwt.verify(token, process.env.jwt_secret);
    if (user.userObj.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .send("You are not allowed to perform this operation");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
