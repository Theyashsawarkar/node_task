import Joi from 'joi';
import { user_roles } from '../utils/enums.js';
import { joiString, joiEmail, joiUuid } from '../utils/validationHelpers.js';

export const signUpSchema = Joi.object({
  /* <--------------- BASE FIELDS (Required for all roles) ---------------> */
  name: joiString({ max: 100 }),
  email: joiEmail(),
  password: joiString({ min: 8, max: 128 }),
  role: Joi.string()
    .valid(...Object.values(user_roles))
    .required(),

  /* <--------------- CONDITIONAL FIELDS (Seller only) ---------------> */
  mobileNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .when('role', {
      is: user_roles.seller,
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),

  countryId: joiUuid().when('role', {
    is: user_roles.seller,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),

  stateId: joiUuid().when('role', {
    is: user_roles.seller,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),

  skills: Joi.array()
    .items(joiString({ required: false }))
    .when('role', {
      is: user_roles.seller,
      then: Joi.optional().default([]),
      otherwise: Joi.forbidden(),
    }),
});

export const signInSchema = Joi.object({
  email: joiEmail(),
  password: joiString({ min: 8, max: 128 }),
  role: Joi.string()
    .valid(...Object.values(user_roles))
    .required(),
});
