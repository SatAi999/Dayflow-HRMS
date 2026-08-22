import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    fileName: {
      type: String,
      required: true,
      trim: true
    },
    fileUrl: {
      type: String,
      required: true
    },
    fileType: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const DocumentModel = mongoose.model('Document', documentSchema);
export default DocumentModel;
