import DocumentModel from './document.model.js';
import Employee from '../employees/employee.model.js';

export const getDocumentsByUserId = async (userId) => {
  const employee = await Employee.findOne({ userId });
  if (!employee) return [];
  return await DocumentModel.find({ employeeId: employee._id });
};

export const saveDocument = async (userId, docParams) => {
  const employee = await Employee.findOne({ userId });
  if (!employee) throw new Error('Employee profile not found.');

  const { fileName, fileUrl, fileType } = docParams;
  if (!fileName || !fileUrl || !fileType) {
    throw new Error('fileName, fileUrl, and fileType are required.');
  }

  const document = new DocumentModel({
    employeeId: employee._id,
    fileName,
    fileUrl,
    fileType
  });

  await document.save();
  return document;
};

export const removeDocument = async (id, userId) => {
  const employee = await Employee.findOne({ userId });
  if (!employee) throw new Error('Employee profile not found.');

  const document = await DocumentModel.findById(id);
  if (!document) throw new Error('Document not found.');

  // Validate ownership
  if (document.employeeId.toString() !== employee._id.toString()) {
    throw new Error('Access denied. You do not own this document.');
  }

  await DocumentModel.findByIdAndDelete(id);
};
