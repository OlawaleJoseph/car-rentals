import Users from "../models/users";
import Joi from "@hapi/joi";

export const validateNewUser = (req, res, next) => {
    const schema = Joi.object().keys({
        firstName: Joi.string()
            .min(3)
            .max(30)
            .required()
            .error("First Name is Required"),
        lastName: Joi.string()
            .min(3)
            .max(30)
            .required()
            .error("Last Name is Required"),
        password: Joi.string()
            .regex(/^[a-zA-Z0-9]{3,30}$/)
            .error("Password is Required"),
        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .error("Email is Required")
    });
    try {
    Joi.validate(req.body, schema);
    next();
  } catch (error) {
    res.status(400).json({
      status: 400,
      error
    });
  }

};

export const isRegistered = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await Users.findOne({ email: email });
    if (user) console.log("User");
    if (user.length > 0) {
      res.status(409).json({
        status: 409,
        error: "Email already Registered"
      });
    } else {
      next();
    }
  } catch (error) {
    if (error) {
      res.status(500).json({
        status: 500,
        error: "Internal Server Error"
      });
    }
  }
};
