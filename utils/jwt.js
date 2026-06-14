import { sign, verify } from 'jsonwebtoken';
import { JWT } from './constants';

export function generateTokens({ id, email, role }) {
  const accessToken = generateAccessToken({ id, email, role });
  const refreshToken = generateRefreshToken({ id, email, role });
  return { accessToken, refreshToken };
}

/* <-------------- Verifies the access token --------------> */
export function verifyAccessToken(token) {
  return verify(token, JWT.ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return verify(token, JWT.REFRESH_SECRET);
}

/* <-------------- UTILS: Generates the access token --------------> */
function generateAccessToken(payload) {
  return sign(payload, JWT.ACCESS_SECRET, {
    algorithm: JWT.ALGORITHM,
    expiresIn: JWT.ACCESS_EXPIRES_IN,
  });
}

function generateRefreshToken(payload) {
  return sign(payload, JWT.REFRESH_SECRET, {
    algorithm: JWT.ALGORITHM,
    expiresIn: JWT.REFRESH_EXPIRES_IN,
  });
}
