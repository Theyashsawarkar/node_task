import Joi from 'joi';
import { joiString, joiNumber, paginationQuerySchema } from './index.js';

export const createProductSchema = Joi.object({
  name: joiString({ min: 2, max: 255 }),
  description: joiString({ min: 10, max: 5000 }),

  brandIds: Joi.array()
    .items(joiNumber({ integer: true, min: 1 }))
    .default([])
    .description('An array of integer Brand IDs associated with this product'),
});

export const getAllProductsQuerySchema = paginationQuerySchema.concat(
  Joi.object({
    search: joiString({ max: 255, required: false }).allow('').description('Search by product name or description'),
  }),
);
