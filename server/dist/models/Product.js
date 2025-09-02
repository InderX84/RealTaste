"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
        maxLength: [2000, 'Description cannot exceed 2000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Please select category'],
        enum: {
            values: ['Coffee', 'Tea', 'Beverages', 'Snacks', 'Desserts', 'Breakfast', 'Lunch'],
            message: 'Please select correct category'
        }
    },
    image: {
        type: String,
        required: [true, 'Please add an image']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        min: [0, 'Stock cannot be negative'],
        default: 1
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    ratings: [{
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            },
            comment: {
                type: String,
                required: true,
                maxLength: [500, 'Comment cannot exceed 500 characters']
            },
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        }],
    numOfReviews: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
// Index for faster queries
productSchema.index({ name: 'text', category: 1 });
productSchema.index({ isAvailable: 1, featured: 1 });
// Add calculateAverageRating method after schema declaration
productSchema.methods.calculateAverageRating = async function () {
    if (this.ratings.length === 0) {
        this.numOfReviews = 0;
        return;
    }
    const avg = this.ratings.reduce((acc, r) => acc + r.rating, 0) / this.ratings.length;
    this.numOfReviews = this.ratings.length;
    await this.save();
    return avg;
};
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
