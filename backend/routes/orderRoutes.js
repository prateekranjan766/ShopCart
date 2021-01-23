import express from 'express';
import { protect } from './../middleware/authMiddleware.js';
import { addOrderItems, getOrderById } from '../controller/orderController.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);

export default router;
