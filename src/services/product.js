import * as dbOperations from '../../utils/dbOperations.js';
import * as commonFunctions from '../../utils/commonFunctions.js';
import models from '../models/index.js';
import { Op } from 'sequelize';

export async function createProduct({ userId, name, description, brandIds = [] }) {
  await validateBrandIds(brandIds);

  const finalProduct = await models.sequelize.transaction(async (transaction) => {
    const productResult = await dbOperations.create({
      model: models.product,
      body: {
        name,
        description,
        seller_id: userId,
      },
      transaction,
    });

    if (brandIds && brandIds.length > 0) {
      const mappedBrandIds = brandIds.map((brandId) => ({
        brand_id: brandId,
        product_id: productResult.id,
      }));

      await dbOperations.create({
        model: models.product_brand,
        body: mappedBrandIds,
        isBulk: true,
        transaction,
      });
    }

    return productResult;
  });

  return commonFunctions.handleSuccess('Product Created Successfully', finalProduct);
}

export async function getProducts({ page = 1, limit = 10, search }) {
  const result = await dbOperations.findAll({
    model: models.product,
    condition: {
      deleted_at: null,
      ...(search && {
        [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }, { description: { [Op.iLike]: `%${search}%` } }],
      }),
    },
    include: [
      {
        model: models.brand,
        through: { attributes: [] },
      },
    ],
    ...commonFunctions.getPagination({ page, limit }),

    //NOTE: Forces Sequelize to count the distinct primary keys
    // of the main model (products) rather than the duplicated JOIN rows.
    distinct: true,
  });

  return commonFunctions.handleSuccess(
    'Products Fetched Successfully',
    commonFunctions.paginatedResponse({
      page,
      limit,
      totalCount: result.count,
      responses: result.rows,
    }),
  );
}

async function validateBrandIds(brandIds) {
  const brandCount = await dbOperations.count({
    model: models.brand,
    condition: {
      id: {
        [Op.in]: brandIds,
      },
      deleted_at: null,
    },
  });

  if (brandCount !== brandIds.length) {
    throw new Error('One or more brand IDs are invalid or deleted');
  }
}
