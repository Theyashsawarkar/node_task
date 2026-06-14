import { Router } from 'express';
import { errorWrapper } from '../../utils/commonFunctions.js';
import * as sellersValidation from '../validations/seller.js';
import * as sellersController from '../controllers/seller.js';
import { validate } from '../middlewares/validator.js';
import { user_roles } from '../../utils/enums.js';

const router = Router();

router.get(
  '/',
  checkAuth,
  checkPermission({ allowedRoles: [...Object.values(user_roles)] }),
  validate(sellersValidation.getAllSellersQuerySchema),
  errorWrapper(sellersController.getAllSellers),
);

export default router;
