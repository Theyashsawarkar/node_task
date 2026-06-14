import { Router } from 'express';
import { errorWrapper } from '../../utils/commonFunctions.js';
import * as productValidation from '../validations/product.js';
import * as productController from '../controllers/product.js';
import { validate } from '../middlewares/validator.js';

const router = Router();

router.post('/', validate(productValidation.createProductSchema), errorWrapper(productController.createProduct));
router.get('/', validate(productValidation.getAllProductsQuerySchema), errorWrapper(productController.getAllProducts));

export default router;
