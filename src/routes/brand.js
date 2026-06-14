import { Router } from 'express';
import { errorWrapper } from '../../utils/commonFunctions.js';
import * as brandValidation from '../validations/brand.js';
import * as brandController from '../controllers/brand.js';
import { validate } from '../middlewares/validator.js';
import { singleFileUploadMiddleware } from '../middlewares/fileUpload.js';

const router = Router();

router.post(
  '/',
  validate(brandValidation.createBrandSchema),
  singleFileUploadMiddleware(),
  errorWrapper(brandController.creteBrand),
);

router.get('/', errorWrapper(brandController.getAllBrands));

export default router;
