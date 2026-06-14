import { Router } from 'express';
import { errorWrapper } from '../../utils/commonFunctions.js';
import * as authController from '../controllers/auth.js';
import { singleFileUploadMiddleware } from '../middlewares/fileUpload.js';
import * as authValidation from '../validations/auth.js';
import { validate } from '../middlewares/validator.js';

const router = Router();

router.post(
  '/signup',
  validate(authValidation.signUpSchema),
  singleFileUploadMiddleware(),
  errorWrapper(authController.signUp),
);

router.post('/signin', validate(authValidation.signInSchema), errorWrapper(authController.signIn));
router.post('/refresh', validate(authValidation.refreshTokenSchema), errorWrapper(authController.refreshAccessToken));

export default router;
