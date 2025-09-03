import { Request, Response, NextFunction } from 'express';
import { Order, Product, User } from '../models';
import BaseController from './base.controller';
import sendEmail from '../utils/sendEmail';

class OrderController extends BaseController {
  constructor() {
    super(Order);
  }

  // Create new order
  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { items, paymentMethod, mobileNumber, specialInstructions, totalAmount } = req.body;

      // Verify products and calculate total
      let calculatedTotal = 0;
      for (const item of items) {
        const product = await Product.findById(item.menuItem);
        if (!product) {
          res.status(404).json({
            success: false,
            message: `Product not found: ${item.menuItem}`
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

        calculatedTotal += product.price * item.quantity;
      }

      // Create order (takeaway - no shipping address needed)
      const order = await Order.create({
        user: req.user?.id,
        items,
        paymentMethod,
        mobileNumber,
        specialInstructions,
        totalAmount: totalAmount || calculatedTotal
      });

      // Update product stock
      for (const item of items) {
        const product = await Product.findById(item.menuItem);
        if (product) {
          product.stock -= item.quantity;
          await product.save();
        }
      }

      // Send order confirmation email
      try {
        const user = await User.findById(req.user?.id);
        if (user) {
          await sendEmail({
            email: user.email,
            subject: 'Order Confirmation - Real Taste',
            html: `
              <h2>Order Confirmation</h2>
              <p>Hi ${user.name},</p>
              <p>Thank you for your takeaway order! Your order #${String(order._id).slice(-6)} has been received.</p>
              <p><strong>Total Amount:</strong> ₹${order.totalAmount.toFixed(2)}</p>
              <p><strong>Status:</strong> ${order.status}</p>
              <p><strong>Pickup Location:</strong> UpalHeri, Rajpura, Punjab 140401</p>
              <p>We'll call you on ${mobileNumber} when your order is ready for pickup.</p>
              <p>Best regards,<br>Real Taste Team</p>
            `,
            message: `Order #${String(order._id).slice(-6)} confirmed. Total: ₹${order.totalAmount.toFixed(2)}`
          });
        }
      } catch (emailError) {
        console.error('Failed to send order confirmation email:', emailError);
      }

      res.status(201).json({
        success: true,
        data: order
      });
    } catch (error) {
      next(error);
    }
  };

  // Get user orders
  getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await Order.find({ user: req.user?.id })
        .populate('items.menuItem')
        .populate('user', 'name email')
        .sort('-createdAt');

      res.status(200).json({
        success: true,
        count: orders.length,
        data: orders
      });
    } catch (error) {
      next(error);
    }
  };

  // Get all orders (admin)
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await Order.find()
        .populate('items.menuItem')
        .populate('user', 'name email')
        .sort('-createdAt');

      res.status(200).json({
        success: true,
        count: orders.length,
        data: orders
      });
    } catch (error) {
      next(error);
    }
  };

  // Update order status
  updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status } = req.body;
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      ).populate('user');

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      // Send status update email
      try {
        const user = order.user as any;
        if (user && user.email) {
          const statusMessages = {
            'Preparing': 'Your order is being prepared',
            'Ready': 'Your order is ready for pickup/delivery',
            'Delivered': 'Your order has been delivered',
            'Cancelled': 'Your order has been cancelled'
          };

          await sendEmail({
            email: user.email,
            subject: `Order Update - Real Taste`,
            html: `
              <h2>Order Status Update</h2>
              <p>Hi ${user.name},</p>
              <p>Your order #${String(order._id).slice(-6)} status has been updated.</p>
              <p><strong>New Status:</strong> ${status}</p>
              <p>${statusMessages[status as keyof typeof statusMessages] || 'Status updated'}</p>
              <p>Best regards,<br>Real Taste Team</p>
            `,
            message: `Order #${String(order._id).slice(-6)} status: ${status}`
          });
        }
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError);
      }

      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      next(error);
    }
  };

  // Mark order as paid
  markOrderAsPaid = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await Order.findById(req.params.id);

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
    } catch (error) {
      next(error);
    }
  };

  // Get single order by ID
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate('items.menuItem')
        .populate('user', 'name email');

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      // Check if user owns the order or is admin
      if (order.user._id.toString() !== req.user?.id && req.user?.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this order'
        });
      }

      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      next(error);
    }
  };

  // Get order statistics
  getOrderStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const totalOrders = await Order.countDocuments();
      const totalSales = await Order.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: '$totalAmount' }
          }
        }
      ]);

      const dailyOrders = await Order.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            orders: { $sum: 1 },
            sales: { $sum: '$totalAmount' }
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
    } catch (error) {
      next(error);
    }
  };
}

export default new OrderController();