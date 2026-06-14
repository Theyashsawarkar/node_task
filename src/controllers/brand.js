import Response from '../../utils/response.js';
import * as brandService from '../services/brand.js';

export const creteBrand = async (req, res) => {
  const result = await brandService.createBrand({ ...req.body, userId: req.userData.id });
  Response.created(res, result);
};

export const getAllBrands = async (req, res) => {
  const result = await brandService.getAllBrands(req.query);
  Response.ok(res, result);
};
