import * as dbOperations from '../../utils/dbOperations.js';
import * as commonFunctions from '../../utils/commonFunctions.js';
import models from '../models/index.js';
import { Op } from 'sequelize';

export async function createProduct({ userId, name, description, brandIds = [] }) {
  await validateBrandIds(brandIds);

  const result = await dbOperations.create({
    model: models.product,
    data: {
      name,
      description,
      seller_id: userId,
    },
  });

  await dbOperations.update({
    model: models.brand,
    condition: {
      id: {
        [Op.in]: brandIds,
      },
    },
    updatedBody: {
      product_id: result.id,
    },
  });

  return commonFunctions.handleSuccess('Product Created Successfully', result);
}

export async function getProducts({ page = 1, limit = 10, search }) {
  const result = await dbOperations.findAll({
    model: models.product,
    condition: {
      deleted_at: null,
      ...(search && {
        [Op.or]: [{ name: { [Op.like]: `%${search}%` } }, { description: { [Op.like]: `%${search}%` } }],
      }),
    },
    include: [
      {
        model: models.brand,
        as: 'brands',
      },
    ],
    ...commonFunctions.getPagination({ page: 1, limit: 10 }),
  });

  return commonFunctions.handleSuccess(
    'Brands Fetched Successfully',
    commonFunctions.paginatedResponse({ page, limit, totalCount: result.count, responses: result.docs }),
  );
}
