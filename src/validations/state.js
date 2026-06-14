import Joi from 'joi';
import { joiNumber, joiString } from './index.js';

export const getAllStatesQuerySchema = Joi.object({
  name: joiString({ max: 100, required: true }).description('State Name Is Required'),
  countryId: joiNumber({ required: true }).description('Country ID Is Required'),
});
