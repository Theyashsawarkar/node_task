import Response from '../../utils/response.js';
import * as productService from '../services/product.js';

export const createProduct = async (req, res) => {
  const result = await productService.createProduct(req.body);
  Response.created(res, result);
};

export const getAllProducts = async (req, res) => {
  const result = await productService.getAllProducts(req.query);
  Response.ok(res, result);
};
