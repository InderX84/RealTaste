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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group m-2">
      <div className="relative overflow-hidden">
        <img 
          src={product.image || 'https://placehold.co/400x300/f3f4f6/6b7280?text=No+Image'} 
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            ${product.price}
          </span>
        </div>
        {product.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              Featured
            </span>
          </div>
        )}
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-bold text-lg bg-red-600 px-4 py-2 rounded-full">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="content-spacing">
        <div className="mb-3">
          <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">
              {averageRating.toFixed(1)} ({product.numOfReviews})
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Stock: {product.stock}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Link
            to={`/product/${product._id}`}
            className="flex-1 bg-amber-100 text-amber-800 py-3 rounded-xl font-bold hover:bg-amber-200 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
            className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl font-bold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none"
          >
            {product.isAvailable ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;