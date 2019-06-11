import Joi from "@hapi/joi";
export const validateLoginDetails = async (req, res, next) => {
  const schema = Joi.schema.keys({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .error(() => {
        return res.status(400).json({
          status: 400,
          error: "Invalid email"
        });
      }),
    password: Joi.String()
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
    res.status(400).json({
      message: "Something Happened",
      error
    });
  }
};
