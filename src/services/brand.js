import * as dbOperations from '../../utils/dbOperations.js';
import * as commonFunctions from '../../utils/commonFunctions.js';

import models from '../models/index.js';

export async function createBrand({ userId, name, price, detail, uploadedFilePath }) {
  const result = await dbOperations.create({
    model: models.brand,
    body: {
      product_id: null,
      name,
      detail,
      image_path: uploadedFilePath,
      user_id: userId,
      price,
    },
  });

  return commonFunctions.handleSuccess('Brand Created Successfully', result);
}

export async function getAllBrands() {
  const result = await dbOperations.findAll({
    model: models.brand,
    condition: {
      deleted_at: null,
    },
  });

  return commonFunctions.handleSuccess('Brands Fetched Successfully', result);
}
