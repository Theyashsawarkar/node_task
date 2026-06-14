import Joi from 'joi';
import { joiString, joiEmail, joiUuid } from './index.js';
import { user_gender, user_roles } from '../../utils/enums.js';
import { CONSTANT } from '../../utils/constants.js';

export const signUpSchema = Joi.object({
  /* <--------------- BASE FIELDS (Required for all roles) ---------------> */
  name: joiString({ max: 100 }),
  email: joiEmail(),
  mobileNumber: Joi.string().pattern(/^[0-9]{10,15}$/),
  password: joiString({ min: 8, max: 128 }),
  gender: Joi.string()
    .valid(...Object.values(user_gender))
    .required(),
  role: Joi.string()
    .valid(...Object.values(user_roles))
    .required(),

  /* <--------------- CONDITIONAL FIELDS (Seller only) ---------------> */

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

export const refreshTokenSchema = Joi.object({
  refreshToken: joiString({ required: true }).pattern(CONSTANT.JWT.JWT_PATTERN).messages({
    'string.pattern.base': 'Invalid token format. Expected a valid JWT structure.',
  }),
});
