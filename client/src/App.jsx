import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import { loadUser } from './store/slices/authSlice';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { ToastProvider } from './contexts/ToastContext';
import { useSettings } from './hooks/useSettings';
import Preloader from './components/ui/Preloader';
import Maintenance from './pages/Maintenance';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import AdminRoute from './components/admin/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCategories from './pages/admin/AdminCategories';
import AdminSettings from './pages/admin/AdminSettings';

const AppContent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.auth);
  const { settings, loading: settingsLoading } = useSettings();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const timer = setTimeout(() => {
      if (token) {
        dispatch(loadUser()).finally(() => setInitialLoad(false));
      } else {
        setInitialLoad(false);
      }
    }, 2000); // Show preloader for at least 2 seconds

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (initialLoad || settingsLoading) {
    return <Preloader />;
  }

  // Show maintenance page if enabled and user is not admin
  if (settings.maintenanceMode && (!user || user.role !== 'admin')) {
    return <Maintenance />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
            <Route path="/admin/categories" element={<AdminRoute><AdminCategories /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
            <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;