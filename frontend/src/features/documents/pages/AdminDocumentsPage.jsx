import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../../services/api/endpoints.js';
import Spinner from '../../../components/ui/Spinner.jsx';

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(ENDPOINTS.DOCUMENTS.UPLOAD); // Uses GET /api/documents
      if (response.data.success) {
        setDocuments(response.data.documents);
      }
    } catch (err) {
      setError('Failed to fetch corporate document audit logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Spinner size="lg" label="Auditing corporate document files..." />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Corporate Document Audit</h1>
        <p className="mt-1 text-sm text-gray-500">Access, view, and inspect all employee uploaded verification documents and files.</p>
      </div>

      {error && (
        <div className="text-sm bg-red-50 border-l-4 border-red-500 text-red-700 p-3.5 rounded-r">
          {error}
        </div>
      )}

      {/* Documents Directory Table */}
      <div className="bg-white shadow border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Employee Name</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">File Name</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">File Type</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Upload Date</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-700">
              {documents.length > 0 ? (
                documents.map((doc) => (
                  <tr key={doc._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
                      {doc.employeeId?.firstName} {doc.employeeId?.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-600">
                      {doc.employeeId?.department || 'Operations'}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate font-medium text-gray-900">
                      {doc.fileName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap uppercase text-xs font-bold text-gray-500">
                      {doc.fileType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100/60 px-3 py-1.5 rounded transition"
                      >
                        Inspect File &rarr;
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-sm text-gray-500 italic">
                    No workforce documents have been uploaded to the cabinet yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
