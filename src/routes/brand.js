import { Router } from 'express';
import { errorWrapper } from '../../utils/commonFunctions.js';
import * as brandValidation from '../validations/brand.js';
import * as brandController from '../controllers/brand.js';
import { validate } from '../middlewares/validator.js';
import { singleFileUploadMiddleware } from '../middlewares/fileUpload.js';
import { checkAuth } from '../middlewares/checkAuth.js';
import { checkPermission } from '../middlewares/checkPermission.js';
import { user_roles } from '../../utils/enums.js';

const router = Router();

router.post(
  '/',
  checkAuth,
  checkPermission({ allowedRoles: [...Object.values(user_roles)] }),
  validate(brandValidation.createBrandSchema),
  singleFileUploadMiddleware(),
  errorWrapper(brandController.creteBrand),
);

router.get(
  '/',
  checkAuth,
  checkPermission({ allowedRoles: [...Object.values(user_roles)] }),
  errorWrapper(brandController.getAllBrands),
);

export default router;
