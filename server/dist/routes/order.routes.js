"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const express_validator_1 = require("express-validator");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
// Validation rules
const orderValidation = [
    (0, express_validator_1.body)('items').isArray().withMessage('Items must be an array'),
    (0, express_validator_1.body)('items.*.product').notEmpty().withMessage('Product ID is required'),
    (0, express_validator_1.body)('items.*.quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1'),
    (0, express_validator_1.body)('shippingAddress').notEmpty().withMessage('Shipping address is required'),
    (0, express_validator_1.body)('paymentMethod')
        .isIn(['Cash', 'Card'])
        .withMessage('Invalid payment method')
];
// Protected routes
router.use(auth_1.protect);
router.post('/', (0, validate_1.validate)(orderValidation), controllers_1.OrderController.create);
router.get('/my-orders', controllers_1.OrderController.getUserOrders);
router.get('/:id', controllers_1.OrderController.getOne);
// Admin routes
router.get('/', (0, auth_1.authorize)('admin'), controllers_1.OrderController.getAll);
router.put('/:id/status', (0, auth_1.authorize)('admin'), controllers_1.OrderController.updateOrderStatus);
router.put('/:id/pay', (0, auth_1.authorize)('admin'), controllers_1.OrderController.markOrderAsPaid);
router.get('/stats', (0, auth_1.authorize)('admin'), controllers_1.OrderController.getOrderStats);
exports.default = router;
