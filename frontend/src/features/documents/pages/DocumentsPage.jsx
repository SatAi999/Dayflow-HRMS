import React, { useState, useEffect } from 'react';
import * as documentService from '../services/documentService.js';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [formData, setFormData] = useState({
    fileName: '',
    fileUrl: '',
    fileType: 'pdf'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchDocs = async () => {
    try {
      const res = await documentService.getMyDocuments();
      if (res.success) {
        setDocuments(res.documents);
      }
    } catch (err) {
      console.error('Error fetching documents:', err);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Mock automatic document URL generation if empty
    const filePayload = {
      ...formData,
      fileUrl: formData.fileUrl || `https://storage.dayflow.com/docs/EMP_${Date.now()}.${formData.fileType}`
    };

    try {
      const res = await documentService.uploadDocument(filePayload);
      if (res.success) {
        setSuccess('Document uploaded successfully!');
        setFormData({
          fileName: '',
          fileUrl: '',
          fileType: 'pdf'
        });
        fetchDocs(); // Refresh documents
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload document.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;
    
    try {
      const res = await documentService.deleteDocument(id);
      if (res.success) {
        fetchDocs(); // Refresh list
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete document.');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Document Cabinet</h1>
        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">Developer: Member 3</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload New Document</h2>

          {error && <div className="mb-4 text-sm bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded">{error}</div>}
          {success && <div className="mb-4 text-sm bg-green-50 border-l-4 border-green-500 text-green-700 p-3 rounded">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
              <input
                type="text"
                name="fileName"
                value={formData.fileName}
                onChange={handleChange}
                required
                placeholder="e.g. Passport, Tax Form"
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Document Format</label>
              <select
                name="fileType"
                value={formData.fileType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="pdf">PDF Document</option>
                <option value="jpg">JPG Image</option>
                <option value="png">PNG Image</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Document URL <span className="text-xs text-gray-400 font-normal">(Optional Mock)</span>
              </label>
              <input
                type="text"
                name="fileUrl"
                value={formData.fileUrl}
                onChange={handleChange}
                placeholder="Leave blank for automatic URL generation"
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded font-medium transition duration-150 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Upload Document'}
            </button>
          </form>
        </div>

        {/* Uploaded Documents List */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 lg:col-span-2 flex flex-col min-h-[400px]">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">My Documents</h2>

          <div className="flex-1 overflow-x-auto">
            {documents.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No documents uploaded yet. Submit a document to get started.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <div key={doc._id || doc.id} className="p-4 border border-gray-200 rounded-lg flex items-center justify-between hover:shadow-sm transition duration-150">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center font-bold text-gray-600 uppercase text-xs">
                        {doc.fileType}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-medium text-gray-900 truncate">{doc.fileName}</p>
                        <a 
                          href={doc.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-xs text-primary-600 hover:underline truncate block"
                        >
                          View File
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(doc._id || doc.id)}
                      className="text-xs text-red-600 hover:text-red-950 font-medium px-2 py-1 hover:bg-red-50 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
