import { useState } from 'react';
import { Upload, Download, FileText, AlertCircle } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import api from '../../utils/api';

const BulkImport = ({ type, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const toast = useToast();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setErrors([]);
    } else {
      toast.error('Please select a valid CSV file');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post(`/api/bulk/${type}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setFile(null);
        setErrors(response.data.errors || []);
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    const templates = {
      products: 'name,description,price,category,stock,image,isAvailable\nBurger,Delicious beef burger,299,Fast Food,50,burger.jpg,true\nCoffee,Hot coffee,99,Beverages,100,coffee.jpg,true',
      categories: 'name,description,isActive\nFast Food,Quick and tasty food items,true\nBeverages,Hot and cold drinks,true'
    };

    const content = templates[type];
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_template.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl card-spacing border-2 border-amber-200">
      <h3 className="text-xl font-serif font-bold text-amber-900 mb-6 flex items-center">
        <Upload className="h-6 w-6 mr-3" />
        Bulk Import {type === 'products' ? 'Products' : 'Categories'}
      </h3>

      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900">CSV Format Required</h4>
              <p className="text-blue-700 text-sm mt-1">
                Upload a CSV file with the required columns. Download the template below for reference.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={downloadTemplate}
            className="flex items-center justify-center space-x-2 px-4 py-2 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download Template</span>
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select CSV File
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {file && (
            <p className="text-sm text-green-600 mt-2">
              Selected: {file.name}
            </p>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-amber-700 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
        >
          <Upload className="h-5 w-5" />
          <span>{loading ? 'Uploading...' : 'Upload & Import'}</span>
        </button>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900">Import Errors</h4>
                <ul className="text-red-700 text-sm mt-2 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkImport;