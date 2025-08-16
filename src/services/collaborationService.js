import { applyOperation } from './operationalTransform.js';
import { updateFileContent, getFileById } from './fileService.js';

export async function processOperation({ fileId, op }) {
  const file = await getFileById(fileId);
  if (!file) throw Object.assign(new Error('File not found'), { status: 404 });

  const newContent = applyOperation(file.content, op);
  const updated = await updateFileContent(fileId, newContent);

  return updated;
}