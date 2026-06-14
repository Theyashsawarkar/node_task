import router from 'express/router';
import { validator } from '../validations/auth.js';
import { errorWrapper } from '../../utils/commonFunctions.js';
import * as authController from '../controllers/auth.js';
import { singleFileUploadMiddleware } from '../middlewares/fileUpload.js';
import * as authValidation from '../validations/auth.js';

router.post(
  '/signup',
  validator(authValidation.signUpSchema),
  singleFileUploadMiddleware(),
  errorWrapper(authController.signUp),
);

router.post('/signin', validator(authValidation.signInSchema), errorWrapper(authController.signIn));

export default router;
