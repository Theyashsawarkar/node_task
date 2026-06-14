import { BadRequestError } from '../../utils/customErrors';
import { user_roles } from '../../utils/enums';
import * as dbOperations from '../../utils/dbOperations.js';
import * as commonFunctions from '../../utils/commonFunctions.js';

import models from '../models/index.js';
import { generateTokens } from '../../utils/jwt.js';

export const signUp = async ({
  uploadedFilePath,
  name,
  email,
  password,
  role,
  mobileNumber,
  countryId,
  stateId,
  skills = [],
}) => {
  await validateIsEmailTaken(email);

  const userResult = await dbOperations.create({
    model: models.user,
    body: {
      name,
      email,
      password,
      profile_image_path: uploadedFilePath,
      role: role === user_roles.admin ? user_roles.admin : user_roles.seller,
    },
  });

  const res = userResult.toObject();
  delete res.password_hash;

  if (role === user_roles.admin) {
    return commonFunctions.handleSuccess('Admin Created Successfully', res);
  }

  await validateStateAndCountry({ stateId, countryId });

  const sellerResult = await dbOperations.create({
    model: models.seller,
    body: {
      mobile_number: mobileNumber,
      country_id: countryId,
      state_id: stateId,
      skills,
      role: user_roles.seller,
    },
  });

  const response = sellerResult.toObject();
  delete response.password_hash;

  return commonFunctions.handleSuccess('Seller Created Successfully', response);
};

export async function singIn({ email, password, role }) {
  const userResult = await dbOperations.findOne({
    model: models.user,
    condition: { email, role },
  });

  if (!userResult || validatePassword({ password, userRecord: userResult })) {
    throw new BadRequestError('Invalid credentials');
  }

  return commonFunctions.handleSuccess(
    'Signed in successfully',
    generateTokens({ id: userResult._id, email: userResult.email, role: userResult.role }),
  );
}

/* <---------------------------------- Utility Functions----------------------------------> */

async function validateIsEmailTaken(email) {
  const isEmailTaken = await dbOperations.count({
    model: models.user,
    condition: { email },
  });

  if (isEmailTaken) {
    throw new BadRequestError('Email already taken');
  }
}

async function validateStateAndCountry({ stateId, countryId }) {
  const isStateValid = await dbOperations.count({
    model: models.state,
    condition: { id: stateId },
  });

  if (!isStateValid) {
    throw new BadRequestError('Invalid state');
  }

  const isCountryValid = await dbOperations.count({
    model: models.country,
    condition: { id: countryId },
  });

  if (!isCountryValid || isStateValid.country_id !== countryId) {
    throw new BadRequestError('Invalid country');
  }
}

async function validatePassword({ password, userRecord }) {
  const isPasswordValid = userRecord.comparePassword(password);

  if (!isPasswordValid) {
    throw new BadRequestError('Invalid credentials');
  }
}
