import express from 'express';
import { OrderController } from '../controllers';
import { protect, authorize } from '../middleware/auth';
import { body } from 'express-validator';
import { validate } from '../middleware/validate';

const router = express.Router();

// Validation rules
const orderValidation = [
  body('items').isArray().withMessage('Items must be an array'),
  body('items.*.product').notEmpty().withMessage('Product ID is required'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('totalAmount').isNumeric().withMessage('Total amount is required'),
  body('shippingAddress').notEmpty().withMessage('Shipping address is required'),
  body('paymentMethod')
    .isIn(['Cash', 'Card'])
    .withMessage('Invalid payment method')
];

// Protected routes
router.use(protect);

router.post('/', validate(orderValidation), OrderController.create);
router.get('/my-orders', OrderController.getUserOrders);
router.get('/:id', OrderController.getOne);

// Admin routes
router.get('/', authorize('admin'), OrderController.getAll);
router.put('/:id/status', authorize('admin'), OrderController.updateOrderStatus);
router.put('/:id/pay', authorize('admin'), OrderController.markOrderAsPaid);
router.get('/stats', authorize('admin'), OrderController.getOrderStats);

export default router;
