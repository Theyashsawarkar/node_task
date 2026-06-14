import Joi from 'joi';
import { joiNumber, joiString } from './index.js';
import { user_gender } from '../../utils/enums.js';

export const getAllSellersQuerySchema = Joi.object({
  /* <--------------- PAGINATION ---------------> */
  page: joiNumber({ min: 1, integer: true, required: false }).default(1),

  // Cap the limit to prevent a client from requesting 1,000,000 records and crashing the server
  limit: joiNumber({ min: 1, max: 100, integer: true, required: false }).default(10),

  /* <--------------- FILTERS ---------------> */
  search: joiString({ max: 100, required: false }).allow('').description('Search by seller name or email'),

  gender: joiString({ required: false })
    .lowercase()
    .valid(...Object.values(user_gender))
    .description('Filter sellers by gender'),
});
