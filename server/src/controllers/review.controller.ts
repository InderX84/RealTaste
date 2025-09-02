import { Request, Response } from 'express';
import Product from '../models/Product';

interface AuthRequest extends Request {
  user?: any;
}

export const addReview = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already reviewed this product
    const existingReview = product.reviews?.find(
      (review: any) => review.user.toString() === userId
    );

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    const review = {
      user: userId,
      rating: Number(rating),
      comment,
      createdAt: new Date()
    };

    product.reviews = product.reviews || [];
    product.reviews.push(review);
    await product.save();

    // Populate user data for response
    await product.populate('reviews.user', 'name');

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: product.reviews
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProductReviews = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).populate('reviews.user', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      success: true,
      data: product.reviews || []
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};