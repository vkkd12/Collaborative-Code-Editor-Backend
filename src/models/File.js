import mongoose from 'mongoose';
const { Schema } = mongoose;

const fileSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['file', 'folder'],
    default: 'file',
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'File',
    default: null
  },
  content: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'plaintext'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const File = mongoose.model('File', fileSchema);
export default File;