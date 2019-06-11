import Joi from "@hapi/joi";


export const validateLoginDetails = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .error(() => {
        return res.status(400).json({
          status: 400,
          error: "Invalid email"
        });
      }),
    password: Joi.string()
      .required()
      .error(() => {
        return res.status(400).json({
          status: 400,
          error: "Invalid password"
        });
      })
  });
  try {
    await Joi.validate(req.body, schema);
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Something Happened",
      error
    });
  }
};
