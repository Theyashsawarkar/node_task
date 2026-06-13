import { sign, verify } from "jsonwebtoken";
import { JWT } from "./constants";

// --- ACCESS TOKEN METHODS ---
export function generateAccessToken(payload) {
  return sign(payload, JWT.ACCESS_SECRET, {
    algorithm: JWT.ALGORITHM,
    expiresIn: JWT.ACCESS_EXPIRES_IN,
  });
}

export function verifyAccessToken(token) {
  return verify(token, JWT.ACCESS_SECRET);
}

// --- REFRESH TOKEN METHODS ---
export function generateRefreshToken(payload) {
  return sign(payload, JWT.REFRESH_SECRET, {
    algorithm: JWT.ALGORITHM,
    expiresIn: JWT.REFRESH_EXPIRES_IN,
  });
}

export function verifyRefreshToken(token) {
  return verify(token, JWT.REFRESH_SECRET);
}
