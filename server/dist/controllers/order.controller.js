"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const base_controller_1 = __importDefault(require("./base.controller"));
class OrderController extends base_controller_1.default {
    constructor() {
        super(models_1.Order);
        // Create new order
        this.create = async (req, res, next) => {
            try {
                const { items, shippingAddress, paymentMethod } = req.body;
                // Calculate prices
                let itemsPrice = 0;
                let totalPrice = 0;
                // Verify products and calculate total
                for (const item of items) {
                    const product = await models_1.Product.findById(item.product);
                    if (!product) {
                        res.status(404).json({
                            success: false,
                            message: `Product not found: ${item.product}`
                        });
                        return;
                    }
                    if (product.stock < item.quantity) {
                        res.status(400).json({
                            success: false,
                            message: `Insufficient stock for ${product.name}`
                        });
                        return;
                    }
                    itemsPrice += product.price * item.quantity;
                }
                // Calculate tax and shipping
                const taxPrice = itemsPrice * 0.15; // 15% tax
                const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
                totalPrice = itemsPrice + taxPrice + shippingPrice;
                // Create order
                const order = await models_1.Order.create({
                    user: req.user?.id,
                    items,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    taxPrice,
                    shippingPrice,
                    totalPrice
                });
                // Update product stock
                for (const item of items) {
                    const product = await models_1.Product.findById(item.product);
                    if (product) {
                        product.stock -= item.quantity;
                        await product.save();
                    }
                }
                res.status(201).json({
                    success: true,
                    data: order
                });
            }
            catch (error) {
                next(error);
            }
        };
        // Get user orders
        this.getUserOrders = async (req, res, next) => {
            try {
                const orders = await models_1.Order.find({ user: req.user?.id })
                    .populate('items.product')
                    .sort('-createdAt');
                res.status(200).json({
                    success: true,
                    count: orders.length,
                    data: orders
                });
            }
            catch (error) {
                next(error);
            }
        };
        // Update order status
        this.updateOrderStatus = async (req, res, next) => {
            try {
                const { status } = req.body;
                const order = await models_1.Order.findByIdAndUpdate(req.params.id, { orderStatus: status }, { new: true, runValidators: true });
                if (!order) {
                    return res.status(404).json({
                        success: false,
                        message: 'Order not found'
                    });
                }
                res.status(200).json({
                    success: true,
                    data: order
                });
            }
            catch (error) {
                next(error);
            }
        };
        // Mark order as paid
        this.markOrderAsPaid = async (req, res, next) => {
            try {
                const order = await models_1.Order.findById(req.params.id);
                if (!order) {
                    return res.status(404).json({
                        success: false,
                        message: 'Order not found'
                    });
                }
                order.isPaid = true;
                order.paidAt = new Date();
                order.paymentResult = {
                    id: req.body.id,
                    status: req.body.status,
                    updateTime: req.body.update_time,
                    email: req.body.email_address
                };
                const updatedOrder = await order.save();
                res.status(200).json({
                    success: true,
                    data: updatedOrder
                });
            }
            catch (error) {
                next(error);
            }
        };
        // Get order statistics
        this.getOrderStats = async (req, res, next) => {
            try {
                const totalOrders = await models_1.Order.countDocuments();
                const totalSales = await models_1.Order.aggregate([
                    {
                        $group: {
                            _id: null,
                            total: { $sum: '$totalPrice' }
                        }
                    }
                ]);
                const dailyOrders = await models_1.Order.aggregate([
                    {
                        $group: {
                            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                            orders: { $sum: 1 },
                            sales: { $sum: '$totalPrice' }
                        }
                    },
                    { $sort: { _id: -1 } },
                    { $limit: 7 }
                ]);
                res.status(200).json({
                    success: true,
                    data: {
                        totalOrders,
                        totalSales: totalSales[0]?.total || 0,
                        dailyOrders
                    }
                });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = new OrderController();
