import { CustomError } from './customErrors.js';
import * as dbOperations from '../utils/dbOperations.js';
import db from '../src/models/index.js'; // Assuming your models index exports as default in ES6

export async function globalErrorHandler(err, req, res, next) {
  try {
    const userData = req.userData;

    console.log(err);

    await dbOperations.create({
      model: db.errorLogger,
      data: {
        message: err.message,
        method: req.method,
        base_url: req.originalUrl,
        user_data: typeof userData === 'object' ? JSON.stringify(userData) : userData,
        meta: err.stack,
        error: String(err),
      },
    });
  } catch (dbError) {
    console.error('Error While inserting Error Information in Error Logger => ', dbError);
  }

  // Set locals, only providing error in development
  res.locals.message = err.message;

  // Send response for known operational CustomErrors
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      error: err.message,
    });
  }

  // Send fallback response for all other unhandled/system errors
  const statusCode = err.status || err.statusCode || 500;

  return res.status(statusCode).json({
    statusCode: statusCode,
    error: err.name || 'InternalServerError',
    keyValue: err.keyValue ? JSON.stringify(err.keyValue) : undefined,
    message: err.message,
  });
}
