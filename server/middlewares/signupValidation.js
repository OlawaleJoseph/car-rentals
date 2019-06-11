import Users from "../models/users";
import Joi from "@hapi/joi";

export const validateNewUser = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      firstName: Joi.string()
        .min(3)
        .max(30)
        .required()
        .error(() => {
          return res.status(400).json({
            status: 400,
            error: "Invalid First Name"
          });
        }),
      lastName: Joi.string()
        .min(3)
        .max(30)
        .required()
        .error(() => {
          return res.status(400).json({
            status: 400,
            error: "Invalid Last Name"
          });
        }),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .error(() => {
          return res.status(400).json({
            status: 400,
            error: "Invalid Password"
          });
        }),
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .error(() => {
          return res.status(400).json({
            status: 400,
            error: "Invalid email"
          });
        })
    });
    await Joi.validate(req.body, schema);

    next();
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: "Something Went Wrong"
    });
  }
};

export const isRegistered = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (user) {
      res.status(409).json({
        status: 409,
        error: "Email already Registered"
      });
    } else {
      console.log("isRegistered called next");
      next();
    }
  } catch (error) {
    
      res.status(500).json({
        status: 500,
        error: "Internal Server Error"
      });
  }
};
