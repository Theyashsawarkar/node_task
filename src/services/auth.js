import { BadRequestError } from '../../utils/customErrors.js';
import { user_roles } from '../../utils/enums.js';
import * as dbOperations from '../../utils/dbOperations.js';
import * as commonFunctions from '../../utils/commonFunctions.js';

import models from '../models/index.js';
import { generateTokens, verifyRefreshToken } from '../../utils/jwt.js';
import sequelize from '../../config/sequelize.js';

export async function createSellerAccount({
  name,
  email,
  password,
  mobileNumber,
  countryId,
  gender,
  stateId,
  skills = [],
}) {
  await validateIsEmailTaken(email);
  await validateIsMobileNumberTaken(mobileNumber);
  await validateStateAndCountry({ stateId, countryId });

  const result = await models.sequelize.transaction(async (transaction) => {
    const userResult = await dbOperations.create({
      model: models.user,
      body: {
        name,
        email,
        password,
        mobile_number: mobileNumber,
        gender,
        profile_image_path: uploadedFilePath,
        role: user_roles.seller,
      },
      transaction,
    });

    const sellerResult = await dbOperations.create({
      model: models.seller,
      body: {
        user_id: userResult.id,
        country_id: countryId,
        state_id: stateId,
        skills,
        role: user_roles.seller,
      },
      transaction,
    });

    return sellerResult;
  });

  return commonFunctions.handleSuccess('Seller Created Successfully', sellerResult);
}

export const signUp = async ({ uploadedFilePath, name, email, password, mobileNumber, gender }) => {
  await validateIsEmailTaken(email);
  await validateIsMobileNumberTaken(mobileNumber);

  const userResult = await dbOperations.create({
    model: models.user,
    body: {
      name,
      email,
      password_hash: password,
      mobile_number: mobileNumber,
      gender,
      profile_image_path: uploadedFilePath,
      role: user_roles.admin,
    },
  });

  return commonFunctions.handleSuccess('Admin Created Successfully');
};

export async function singIn({ email, password, role }) {
  const userResult = await dbOperations.findOne({
    model: models.user,
    condition: { email, role },
  });

  if (!userResult || !(await userResult.comparePassword(password))) {
    throw new BadRequestError('Invalid credentials');
  }

  return commonFunctions.handleSuccess(
    'Signed in successfully',
    generateTokens({ id: userResult._id, email: userResult.email, role: userResult.role }),
  );
}

export async function refreshAccessToken({ refreshToken }) {
  const userResult = await dbOperations.findOne({
    model: models.user,
    condition: { refresh_token: refreshToken },
  });

  if (!userResult) {
    throw new BadRequestError('Invalid refresh token');
  }

  verifyRefreshToken(refreshToken);
  const tokens = generateTokens({ id: userResult._id, email: userResult.email, role: userResult.role });

  await dbOperations.update({
    model: models.user,
    condition: { id: userResult.id },
    update: { refresh_token: tokens.refreshToken },
  });

  return commonFunctions.handleSuccess('Access token refreshed successfully', tokens);
}

/* <---------------------------------- Utility Functions----------------------------------> */

async function validateIsEmailTaken(email) {
  const isEmailTaken = await dbOperations.count({
    model: models.user,
    condition: { email },
  });

  if (isEmailTaken) {
    throw new BadRequestError('Email Already Asosiated With Another User');
  }
}

async function validateIsMobileNumberTaken(mobile_number) {
  const isEmailTaken = await dbOperations.count({
    model: models.user,
    condition: { mobile_number },
  });

  if (isEmailTaken) {
    throw new BadRequestError('Mobile Number Already Asosiated With Another User');
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

async function validatePassword({ password, userRecord }) {}
