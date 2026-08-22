import * as documentService from './document.service.js';

export const getMyDocs = async (req, res, next) => {
  try {
    const documents = await documentService.getDocumentsByUserId(req.user.id);
    res.status(200).json({ success: true, documents });
  } catch (error) {
    next(error);
  }
};

export const uploadDoc = async (req, res, next) => {
  try {
    const document = await documentService.saveDocument(req.user.id, req.body);
    res.status(201).json({
      success: true,
      message: 'Document uploaded successfully.',
      document
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, errorCode: 'BAD_REQUEST' });
  }
};

export const deleteDoc = async (req, res, next) => {
  try {
    await documentService.removeDocument(req.params.id, req.user.id);
    res.status(200).json({ success: true, message: 'Document deleted successfully.' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, errorCode: 'BAD_REQUEST' });
  }
};
