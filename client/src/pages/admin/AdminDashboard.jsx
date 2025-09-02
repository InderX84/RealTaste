import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Package, Users, ShoppingCart, DollarSign } from 'lucide-react';
import { fetchAllProducts } from '../../store/slices/adminSlice';
import { fetchAllOrders } from '../../store/slices/orderSlice';
import api from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { products = [] } = useSelector(state => state.admin);
  const { allOrders = [] } = useSelector(state => state.orders);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAllProducts());
        await dispatch(fetchAllOrders());
        const { data } = await api.get('/api/users');
        setUsers(data.data || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const totalRevenue = allOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  
  const stats = [
    { title: 'Total Products', value: products.length, icon: Package, color: 'bg-amber-500' },
    { title: 'Total Users', value: users.length, icon: Users, color: 'bg-green-500' },
    { title: 'Total Orders', value: allOrders.length, icon: ShoppingCart, color: 'bg-blue-500' },
    { title: 'Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'bg-purple-500' },
  ];

  return (
    <AdminLayout>
      <div className="p-6 sm:p-8">
        <div className="text-center mb-12">
          <div className="text-4xl mb-4">⚙️</div>
          <h1 className="text-4xl font-serif font-bold text-amber-900 mb-2">Admin Dashboard</h1>
          <p className="text-amber-700">Manage your cafe operations</p>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl card-spacing border-2 border-amber-200">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-amber-700 font-serif">{stat.title}</p>
                  <p className="text-2xl font-bold text-amber-900 font-serif">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/admin/products" className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl card-spacing border-2 border-amber-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <Package className="h-12 w-12 text-amber-600 mb-4" />
            <h3 className="text-xl font-semibold text-amber-900 mb-2 font-serif">Manage Products</h3>
            <p className="text-amber-700 font-serif">Add, edit, or remove menu items</p>
          </Link>

          <Link to="/admin/orders" className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl card-spacing border-2 border-amber-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <ShoppingCart className="h-12 w-12 text-amber-600 mb-4" />
            <h3 className="text-xl font-semibold text-amber-900 mb-2 font-serif">View Orders</h3>
            <p className="text-amber-700 font-serif">Monitor and manage customer orders</p>
          </Link>

          <Link to="/admin/categories" className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl card-spacing border-2 border-amber-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <Package className="h-12 w-12 text-amber-600 mb-4" />
            <h3 className="text-xl font-semibold text-amber-900 mb-2 font-serif">Manage Categories</h3>
            <p className="text-amber-700 font-serif">Organize menu item categories</p>
          </Link>

          <Link to="/admin/users" className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl card-spacing border-2 border-amber-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <Users className="h-12 w-12 text-amber-600 mb-4" />
            <h3 className="text-xl font-semibold text-amber-900 mb-2 font-serif">Manage Users</h3>
            <p className="text-amber-700 font-serif">View and manage user accounts</p>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;