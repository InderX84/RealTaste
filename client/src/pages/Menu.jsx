import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Filter, Coffee } from 'lucide-react';
import { fetchProducts } from '../store/slices/productSlice';
import ProductCard from '../components/ui/ProductCard';
import api from '../utils/api';

const Menu = () => {
  const dispatch = useDispatch();
  const { products = [], loading } = useSelector(state => state.products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
    fetchCategories();
  }, [dispatch]);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/api/categories');
      setCategories(data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && product.isAvailable;
  });

  return (
    <div className="page-container bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-800 via-orange-800 to-red-800 text-white section-spacing relative overflow-hidden">
        <div className="absolute inset-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="3"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
        <div className="relative container mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="mb-6">
            <Coffee className="h-16 w-16 text-yellow-300 mx-auto mb-4" />
          </div>
          <h1 className="text-5xl font-serif font-bold mb-6 text-yellow-100">Café Menu</h1>
          <p className="text-xl text-amber-200 max-w-2xl mx-auto">Handcrafted beverages and homemade treats made with love ☕🍰</p>
        </div>
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 h-5 w-5" />
            <input
              type="text"
              placeholder="What can we brew for you? ☕"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-amber-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 shadow-md text-lg bg-white/80 backdrop-blur-sm font-serif"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-6 py-3 rounded-full font-serif font-semibold transition-all transform hover:scale-105 ${
              selectedCategory === 'All'
                ? 'bg-amber-700 text-yellow-100 shadow-lg'
                : 'bg-white/80 text-amber-800 hover:bg-amber-100 border-2 border-amber-300 hover:border-amber-400 backdrop-blur-sm'
            }`}
          >
            🍽️ All Items
          </button>
          {categories.filter(cat => cat.isActive).map(category => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-6 py-3 rounded-full font-serif font-semibold transition-all transform hover:scale-105 ${
                selectedCategory === category.name
                  ? 'bg-amber-700 text-yellow-100 shadow-lg'
                  : 'bg-white/80 text-amber-800 hover:bg-amber-100 border-2 border-amber-300 hover:border-amber-400 backdrop-blur-sm'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Coffee className="h-16 w-16 text-amber-600 animate-bounce mb-4" />
            <p className="text-amber-800 font-serif text-lg">Brewing something special...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl mx-4 card-spacing">
            <div className="text-6xl mb-6">😔</div>
            <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4">Nothing matches your taste</h3>
            <p className="text-amber-700 text-lg">Try a different search or explore all our offerings</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;