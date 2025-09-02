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
const productValidation = [
    (0, express_validator_1.body)('name').notEmpty().trim().withMessage('Product name is required'),
    (0, express_validator_1.body)('description').notEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('price').isNumeric().withMessage('Price must be a number'),
    (0, express_validator_1.body)('categoryId').notEmpty().withMessage('Category is required')
];
// Public routes
router.get('/', controllers_1.ProductController.getAll);
router.get('/featured', controllers_1.ProductController.getFeatured);
router.get('/category/:categoryId', controllers_1.ProductController.getByCategory);
router.get('/search', controllers_1.ProductController.searchProducts);
router.get('/:id', controllers_1.ProductController.getOne);
// Protected routes
router.post('/:id/review', auth_1.protect, controllers_1.ProductController.addReview);
// Admin routes
router.post('/', auth_1.protect, (0, auth_1.authorize)('admin'), (0, validate_1.validate)(productValidation), controllers_1.ProductController.create);
router.put('/:id', auth_1.protect, (0, auth_1.authorize)('admin'), (0, validate_1.validate)(productValidation), controllers_1.ProductController.update);
router.delete('/:id', auth_1.protect, (0, auth_1.authorize)('admin'), controllers_1.ProductController.delete);
router.put('/:id/stock', auth_1.protect, (0, auth_1.authorize)('admin'), controllers_1.ProductController.updateStock);
router.put('/:id/availability', auth_1.protect, (0, auth_1.authorize)('admin'), controllers_1.ProductController.toggleAvailability);
exports.default = router;
