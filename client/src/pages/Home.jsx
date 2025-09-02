import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Coffee, Award, Clock, Users } from 'lucide-react';
import { fetchFeaturedProducts } from '../store/slices/productSlice';
import ProductCard from '../components/ui/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const { featuredProducts = [], loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 overflow-hidden">
        <div className="absolute inset-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-600 opacity-20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-orange-400 opacity-25 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
          <div className="mb-8">
            <Coffee className="h-20 w-20 text-yellow-400 mx-auto mb-6 animate-bounce" />
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 text-yellow-100 drop-shadow-2xl">
            Real Taste Café
          </h1>
          <p className="text-xl md:text-2xl mb-12 font-light max-w-3xl mx-auto leading-relaxed text-amber-100">
            A cozy corner where <span className="font-semibold text-yellow-300">stories brew</span> and <span className="font-semibold text-yellow-300">friendships blend</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/menu" 
              className="bg-yellow-600 text-amber-900 px-10 py-4 rounded-full text-lg font-bold hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              ☕ View Our Menu
            </Link>
            <Link 
              to="/about" 
              className="border-2 border-yellow-400 text-yellow-100 px-10 py-4 rounded-full text-lg font-bold hover:bg-yellow-400 hover:text-amber-900 transition-all duration-300 transform hover:scale-105"
            >
              📖 Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-amber-700 font-semibold text-base tracking-wide uppercase font-serif">✨ What Makes Us Special</span>
            <h2 className="text-5xl font-serif font-bold text-amber-900 mb-6 mt-4">The Café Experience</h2>
            <p className="text-xl text-amber-800 max-w-2xl mx-auto leading-relaxed">
              Every cup tells a story, every bite creates a memory
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Coffee, title: "Freshly Roasted", desc: "Beans roasted daily in small batches for perfect flavor", emoji: "☕" },
              { icon: Award, title: "Cozy Atmosphere", desc: "Warm, welcoming space perfect for work or relaxation", emoji: "🏠" },
              { icon: Clock, title: "All Day Comfort", desc: "From morning coffee to evening treats", emoji: "🌅" },
              { icon: Users, title: "Community Hub", desc: "Where neighbors become friends over great coffee", emoji: "👥" }
            ].map((feature, index) => (
              <div key={index} className="group text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-amber-200">
                <div className="text-4xl mb-4">{feature.emoji}</div>
                <h3 className="text-xl font-serif font-bold text-amber-900 mb-3 group-hover:text-amber-700 transition-colors">{feature.title}</h3>
                <p className="text-amber-700 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-spacing bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-amber-700 font-semibold text-base tracking-wide uppercase font-serif">🌟 Customer Favorites</span>
            <h2 className="text-5xl font-serif font-bold text-amber-900 mb-6 mt-4">Must-Try Delights</h2>
            <p className="text-xl text-amber-800 max-w-2xl mx-auto leading-relaxed">Discover the flavors that keep our community coming back</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts && featuredProducts.length > 0 ? (
                featuredProducts.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                !loading && (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No featured products available</p>
                  </div>
                )
              )}
            </div>
          )}
          
          <div className="text-center mt-16">
            <Link 
              to="/menu" 
              className="bg-amber-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-amber-700 transition-colors inline-block"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-r from-amber-800 via-orange-800 to-red-800 relative overflow-hidden">
        <div className="absolute inset-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/svg%3E")'}}></div>
        <div className="relative max-w-4xl mx-auto text-center px-6 sm:px-8 lg:px-12">
          <h2 className="text-5xl font-serif font-bold text-yellow-100 mb-6">Visit Us Today</h2>
          <p className="text-xl text-amber-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Step into our warm, inviting space where every visit feels like coming home
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/menu" 
              className="bg-yellow-500 text-amber-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              🍰 Order Online
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-yellow-400 text-yellow-100 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-400 hover:text-amber-900 transition-all duration-300 transform hover:scale-105"
            >
              📍 Find Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;