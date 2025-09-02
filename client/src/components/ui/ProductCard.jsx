import { useDispatch } from 'react-redux';
import { Plus, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { addToCart } from '../../store/slices/cartSlice';
import { useToast } from '../../contexts/ToastContext';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart! 🛒`);
  };

  const averageRating = product?.reviews?.length > 0 
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length 
    : 0;

  if (!product) {
    return null;
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group border-2 border-amber-100 hover:border-amber-200">
      <div className="relative overflow-hidden">
        <img 
          src={product.image || 'https://placehold.co/400x300/f3f4f6/6b7280?text=No+Image'} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-amber-700 text-yellow-100 px-4 py-2 rounded-full font-serif font-bold shadow-lg transform group-hover:scale-110 transition-transform">
            ₹{product.price}
          </div>
        </div>
        
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 left-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
              ⭐ Featured
            </div>
          </div>
        )}
        
        {/* Out of Stock Overlay */}
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
            <div className="text-white font-bold text-lg bg-red-600 px-6 py-3 rounded-full shadow-xl">
              Out of Stock
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        {/* Category Tag */}
        <div className="mb-4">
          <span className="inline-block text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            {product.category}
          </span>
        </div>
        
        {/* Product Name */}
        <h3 className="text-xl font-serif font-bold text-amber-900 mb-3 group-hover:text-amber-700 transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-amber-700 mb-4 line-clamp-2 leading-relaxed font-serif">
          {product.description}
        </p>
        
        {/* Rating and Stock */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(averageRating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-amber-700 font-serif ml-2">
              {averageRating.toFixed(1)} ({product.numOfReviews || 0})
            </span>
          </div>
          <div className="text-sm text-amber-600 font-serif font-semibold">
            Stock: {product.stock}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Link
            to={`/product/${product._id}`}
            className="flex-1 bg-amber-100 text-amber-800 py-3 px-4 rounded-2xl font-serif font-bold hover:bg-amber-200 transition-all duration-300 flex items-center justify-center space-x-2 border-2 border-amber-200 hover:border-amber-300"
          >
            <Eye className="h-4 w-4" />
            <span>Details</span>
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
            className="flex-2 bg-gradient-to-r from-amber-700 to-orange-700 text-yellow-100 py-3 px-4 rounded-2xl font-serif font-bold hover:from-amber-800 hover:to-orange-800 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>{product.isAvailable ? 'Add to Cart' : 'Unavailable'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;