import api from '../../../services/api/axios.js';
import { ENDPOINTS } from '../../../services/api/endpoints.js';

export const getMyDocuments = async () => {
  const response = await api.get(ENDPOINTS.DOCUMENTS.ME);
  return response.data;
};

export const uploadDocument = async (docData) => {
  // Can be multipart form or simple JSON metadata for this demo
  const response = await api.post(ENDPOINTS.DOCUMENTS.UPLOAD, docData);
  return response.data;
};

export const deleteDocument = async (id) => {
  const response = await api.delete(ENDPOINTS.DOCUMENTS.DELETE(id));
  return response.data;
};
