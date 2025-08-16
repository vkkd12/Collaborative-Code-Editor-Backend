import File from '../models/File.js';

export async function createFile({ project, path, content = '', language = 'plaintext' }) {
  return File.create({ project, path, content, language });
}

export async function updateFileContent(id, content) {
  return File.findByIdAndUpdate(id, { content }, { new: true });
}

export async function getFileById(id) {
  return File.findById(id);
}

export async function deleteFile(id) {
  return File.findByIdAndDelete(id);
}