import Response from '../../utils/response.js';
import * as productService from '../services/product.js';

export const createProduct = async (req, res) => {
  const result = await productService.createProduct({ ...req.body, userId: req.userData.id });
  Response.created(res, result);
};

export const getAllProducts = async (req, res) => {
  const result = await productService.getProducts(req.query);
  Response.ok(res, result);
};
