import router from 'express/router';
import { validator } from '../validations/auth.js';
import { errorWrapper } from '../../utils/commonFunctions.js';
import * as sellersValidation from '../validations/seller.js';
import * as sellersController from '../controllers/seller.js';

router.get('/', validator(sellersValidation.getAllSellersQuerySchema), errorWrapper(sellersController.getAllSellers));

export default router;
