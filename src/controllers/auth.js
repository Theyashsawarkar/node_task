import Response from '../../utils/response.js';
import * as authService from '../services/auth.js';

export const signUp = async (req, res) => {
  const result = await authService.signUp(req.body);
  Response.send(res, result);
};

export const signIn = async (req, res) => {
  const result = await authService.singIn(req.body);
  Response.send(res, result);
};
