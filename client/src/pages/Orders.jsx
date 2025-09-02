import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingBag, Calendar, DollarSign } from 'lucide-react';
import { fetchUserOrders } from '../store/slices/orderSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { userOrders: orders = [], loading } = useSelector(state => state.orders);

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, user, isAuthenticated]);

  if (!isAuthenticated || !user) {
    return (
      <div className="page-container bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center card-spacing">
          <p className="text-gray-600">Please log in to view your orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <div className="text-4xl mb-4">📋</div>
          <h1 className="text-4xl font-serif font-bold text-amber-900 mb-2">Your Orders</h1>
          <p className="text-amber-700">Track your delicious orders</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl card-spacing">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-3xl font-serif font-bold text-amber-900 mb-4">No orders yet</h2>
            <p className="text-amber-700 mb-8 text-lg">Start shopping to see your orders here</p>
            <a 
              href="/menu" 
              className="bg-amber-700 text-yellow-100 px-8 py-4 rounded-full text-lg font-serif font-bold hover:bg-amber-800 transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
            >
              Browse Menu
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order._id} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl card-spacing border-2 border-amber-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order._id.slice(-6)}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>${order.totalAmount}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700">Item x {item.quantity}</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;