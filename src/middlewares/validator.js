import httpStatus from "http-status";

export const validate = (schema) => async (req, res, next) => {
  try {
    // Merging body, params, AND query to validate all incoming data sources at once
    const inputData = {
      ...req.body,
      ...req.params,
      ...req.query,
    };

    // Joi returns all validation errors at once,
    // rather than failing immediately on the first one it finds.
    await schema.validateAsync(inputData, { abortEarly: false });

    next();
  } catch (error) {
    /* NOTE: Joi wraps field names in quotes (e.g., "\"email\" must be a valid email").
             This regex strips those quotes out for a cleaner client-facing response.
    */
    const cleanMessage = error.isJoi
      ? error.message.replace(/"/g, "")
      : error.message;

    return res.status(httpStatus.BAD_REQUEST).json({
      statusCode: httpStatus.BAD_REQUEST,
      error: "Bad Request",
      message: cleanMessage,
    });
  }
};
