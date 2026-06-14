import { user_roles } from '../../utils/enums.js';
import * as dbOperations from '../../utils/dbOperations.js';
import * as commonFunctions from '../../utils/commonFunctions.js';

import models from '../models/index.js';
import { UnauthorizedError } from '../../utils/customErrors.js';

export const getAllSellers = async ({ page, limit, search, gender }) => {
  const result = await dbOperations.findAll({
    model: models.user,
    condition: {
      deleted_at: null,
      role: user_roles.seller,
      ...(search && {
        ...[
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { mobile_number: { [Op.like]: `%${search}%` } },
        ],
      }),
      ...(gender && { gender }),
    },

    include: [
      {
        model: models.seller,
        as: 'seller',
        include: [
          {
            model: models.country,
            as: 'country',
          },
          {
            model: models.state,
            as: 'state',
          },
        ],
      },
    ],
    ...commonFunctions.getPagination({ page, limit }),
  });

  return commonFunctions.handleSuccess(
    'Seller Records Fetched Successfully',
    commonFunctions.paginatedResponse({
      page,
      limit,
      totalCount: result.count,
      responses: result.rows,
    }),
  );
};

export const getSellerById = async ({ sellerId }) => {
  const result = await dbOperations.findByPk({
    model: models.user,
    id: sellerId,
    condition: {
      deleted_at: null,
    },

    attributes: ['-password_hash'],

    include: [
      {
        model: models.seller,
        as: 'seller',
        include: [
          {
            model: models.country,
            as: 'country',
          },
          {
            model: models.state,
            as: 'state',
          },
        ],
      },
    ],
    ...commonFunctions.getPagination({ page, limit }),
  });

  return commonFunctions.handleSuccess('Seller Record Fetched Successfully', result);
};

export const deleteSellerAccount = async ({ sellerId, userId, role }) => {
  await checkIfAllowedToDelete({ sellerId, userId, role });

  const sellerAccount = await dbOperations.findByPk({
    model: models.seller,
    id: sellerId,
    condition: {
      deleted_at: null,
    },
    raw: true,
  });

  if (!sellerAccount) {
    return handleError('Seller Account Not Found');
  }

  await dbOperations.destroy({
    model: models.user,
    condition: {
      id: sellerAccount.user_id,
      deleted_at: null,
    },
  });

  await dbOperations.destroy({
    model: models.seller,
    condition: {
      id: sellerAccount.id,
      deleted_at: null,
    },
  });

  return commonFunctions.handleSuccess('Seller Account Deleted Successfully');
};

/* <---------- utils -----------> */

async function checkIfAllowedToDelete({ sellerId, userId, role }) {
  if (role !== user_roles.admin) {
    const sellerAccount = await dbOperations.findByPk({
      model: models.seller,
      id: sellerId,
      condition: {
        deleted_at: null,
      },
      raw: true,
    });

    if (!sellerAccount || sellerAccount.user_id !== userId) {
      throw new UnauthorizedError('You are not authorized to delete this seller account');
    }
  }
}
