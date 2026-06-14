import { Router } from 'express';
import { errorWrapper } from '../../utils/commonFunctions.js';
import * as sellersValidation from '../validations/seller.js';
import * as sellersController from '../controllers/seller.js';
import { validate } from '../middlewares/validator.js';

const router = Router();

router.get('/', validate(sellersValidation.getAllSellersQuerySchema), errorWrapper(sellersController.getAllSellers));

export default router;
