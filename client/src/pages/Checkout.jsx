import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CreditCard, MapPin } from 'lucide-react';
import { clearCart } from '../store/slices/cartSlice';
import { useToast } from '../contexts/ToastContext';
import api from '../utils/api';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { items, total } = useSelector(state => state.cart);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      paymentMethod: 'Card',
      shippingAddress: ''
    }
  });

  const onSubmit = async (data) => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderData = {
        items: items.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: parseFloat(total.toFixed(2)),
        paymentMethod: data.paymentMethod,
        shippingAddress: data.shippingAddress,
        specialInstructions: data.specialInstructions || ''
      };

      console.log('Order data:', orderData);
      const response = await api.post('/api/orders', orderData);
      
      if (response.data.success) {
        dispatch(clearCart());
        toast.success('Order placed successfully! 🎉');
        navigate('/orders');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to place order';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
    } else if (items.length === 0) {
      navigate('/cart');
    }
  }, [isAuthenticated, user, items.length, navigate]);

  if (!isAuthenticated || !user || items.length === 0) {
    return null;
  }

  return (
    <div className="page-container bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <div className="text-4xl mb-4">🛒</div>
          <h1 className="text-4xl font-serif font-bold text-amber-900 mb-2">Checkout</h1>
          <p className="text-amber-700">Complete your order</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl card-spacing border-2 border-amber-200">
            <h2 className="text-2xl font-serif font-bold text-amber-900 mb-8 flex items-center">
              <span className="mr-3">📝</span> Order Details
            </h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Delivery Address
                </label>
                <textarea
                  {...register('shippingAddress', { required: 'Delivery address is required' })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter your delivery address"
                />
                {errors.shippingAddress && (
                  <p className="text-red-600 text-sm mt-1">{errors.shippingAddress.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CreditCard className="inline h-4 w-4 mr-1" />
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      {...register('paymentMethod')}
                      type="radio"
                      value="Card"
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span className="ml-2">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      {...register('paymentMethod')}
                      type="radio"
                      value="Cash"
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span className="ml-2">Cash on Delivery</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  {...register('specialInstructions')}
                  rows={2}
                  maxLength={500}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Any special requests or instructions"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Placing Order...' : `Place Order - $${total.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl card-spacing border-2 border-amber-200">
            <h2 className="text-2xl font-serif font-bold text-amber-900 mb-8 flex items-center">
              <span className="mr-3">📋</span> Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item._id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={item.image || 'https://via.placeholder.com/50x50?text=No+Image'} 
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;