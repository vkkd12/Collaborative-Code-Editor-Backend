import { processOperation } from '../services/collaborationService.js';

export async function applyOp(req, res) {
  const { fileId, op } = req.body;
  const updated = await processOperation({ fileId, op });
  res.json({
    success: true,
    data: { fileId, content: updated.content }
  });
}