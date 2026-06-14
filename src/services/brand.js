import * as dbOperations from '../../utils/dbOperations.js';
import * as commonFunctions from '../../utils/commonFunctions.js';

import models from '../models/index.js';

export async function createBrand({ userId, name, price, dedails, uploadedFilePath }) {
  const result = await dbOperations.create({
    model: models.brand,
    data: {
      product_id: null,
      name,
      detail: dedails,
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
    include: [
      {
        model: models.user,
        as: 'user',
        attributes: ['-password_hash'],
      },
      {
        model: models.product,
        as: 'product',
      },
    ],
  });

  return commonFunctions.handleSuccess('Brands Fetched Successfully', result);
}
