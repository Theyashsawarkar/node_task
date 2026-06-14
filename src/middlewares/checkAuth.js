import { verifyAccessToken } from '../../utils/jwt.js';
import { CustomError } from '../utils/customErrors.js';
import { UnauthorizedError } from '../../utils/customErrors.js';
import httpStatus from 'http-status';

export const checkAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedError(
        httpStatus.UNAUTHORIZED,
        'Authentication required. Please provide a valid Bearer token.',
      );
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedError(httpStatus.UNAUTHORIZED, 'Malformed authorization header. Token missing.');
    }

    const decodedPayload = verifyAccessToken(token);
    req.userData = decodedPayload;

    next();
  } catch (error) {
    switch (error.name) {
      case 'TokenExpiredError':
        return next(
          new CustomError(httpStatus.UNAUTHORIZED, 'Access token has expired. Please use your refresh token.'),
        );
      case 'JsonWebTokenError':
        return next(new CustomError(httpStatus.UNAUTHORIZED, 'Invalid access token signature or format.'));
      default:
        // For any other unexpected errors, forward them to the global handler
        next(error);
    }
  }
};
