import File from '../models/File.js';
export async function getFilesForProjectHandler(req, res) {
  const files = await File.find({ project: req.params.projectId });
  res.json({ success: true, data: files });
}
import {
  createFile,
  deleteFile,
  getFileById,
  updateFileContent
} from '../services/fileService.js';

export async function createFileHandler(req, res) {
  const file = await createFile({
    ...req.body,
    project: req.params.projectId
  });
  res.status(201).json({ success: true, data: file });
}

export async function getFileHandler(req, res) {
  const file = await getFileById(req.params.fileId);
  if (!file) {
    return res.status(404).json({ success: false, message: 'File not found' });
  }
  res.json({ success: true, data: file });
}

export async function updateFileHandler(req, res) {
  const file = await updateFileContent(req.params.fileId, req.body.content);
  if (!file) {
    return res.status(404).json({ success: false, message: 'File not found' });
  }
  res.json({ success: true, data: file });
}

export async function deleteFileHandler(req, res) {
  const deleted = await deleteFile(req.params.fileId);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'File not found' });
  }
  res.status(204).send();
}