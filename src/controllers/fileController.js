import File from '../models/File.js';
// Helper to build tree from flat file list
function buildFileTree(files) {
  const idMap = {};
  files.forEach(f => idMap[f._id] = { ...f._doc, children: [] });
  const tree = [];
  files.forEach(f => {
    if (f.parent) {
      idMap[f.parent]?.children.push(idMap[f._id]);
    } else {
      tree.push(idMap[f._id]);
    }
  });
  return tree;
}
export async function getFilesForProjectHandler(req, res) {
  const files = await File.find({ project: req.params.projectId });
  res.json({ success: true, data: files });
}

// Get file/folder tree for project
export async function getFilesTreeForProjectHandler(req, res) {
  const files = await File.find({ project: req.params.projectId });
  const tree = buildFileTree(files);
  res.json({ success: true, data: tree });
}
import {
  createFile,
  deleteFile,
  getFileById,
  updateFileContent
} from '../services/fileService.js';

export async function createFileHandler(req, res) {
  // Accept: name, type ('file'|'folder'), parent (optional), content, language
  const file = await File.create({
    project: req.params.projectId,
    name: req.body.name,
    type: req.body.type || 'file',
    parent: req.body.parent || null,
    content: req.body.content || '',
    language: req.body.language || 'plaintext'
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