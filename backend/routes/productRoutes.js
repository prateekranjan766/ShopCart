import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  reviewProduct,
  getTopRatedProducts,
} from '../controller/productController.js';
import { protect, admin } from './../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/top').get(getTopRatedProducts);
router.route('/:id/reviews').post(protect, reviewProduct);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
