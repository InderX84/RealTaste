import { useEffect, useState } from 'react';
import { Users, Mail, Calendar, Shield } from 'lucide-react';
import api from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/users');
      setUsers(data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 sm:p-8">
        <div className="text-center mb-12">
          <div className="text-4xl mb-4">👥</div>
          <h1 className="text-4xl font-serif font-bold text-amber-900 mb-2">Users Management</h1>
          <p className="text-amber-700">View and manage user accounts</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl card-spacing">
            <div className="text-6xl mb-6">👥</div>
            <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4">No users found</h3>
            <p className="text-amber-700 text-lg">Registered users will appear here</p>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border-2 border-amber-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-amber-200">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="table-header-spacing text-left text-xs font-medium text-amber-800 uppercase font-serif">User</th>
                    <th className="table-header-spacing text-left text-xs font-medium text-amber-800 uppercase font-serif">Email</th>
                    <th className="table-header-spacing text-left text-xs font-medium text-amber-800 uppercase font-serif">Role</th>
                    <th className="table-header-spacing text-left text-xs font-medium text-amber-800 uppercase font-serif">Joined</th>
                    <th className="table-header-spacing text-left text-xs font-medium text-amber-800 uppercase font-serif">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-amber-200">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="table-cell-spacing whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                            <span className="text-amber-600 font-bold font-serif text-lg">
                              {user.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-amber-900 font-serif">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell-spacing whitespace-nowrap text-sm text-amber-800 font-serif">
                        {user.email}
                      </td>
                      <td className="table-cell-spacing whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full font-serif ${
                          user.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="table-cell-spacing whitespace-nowrap text-sm text-amber-800 font-serif">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="table-cell-spacing whitespace-nowrap text-sm font-medium">
                        <button className="text-amber-600 hover:text-amber-800 p-2 rounded-full hover:bg-amber-50 transition-all">
                          <Shield className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;