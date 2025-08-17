import { Router } from 'express';
import auth from '../middleware/auth.js';
import { asyncHandler } from '../utils/helpers.js';
import {
  createFileHandler,
  deleteFileHandler,
  getFileHandler,
  updateFileHandler,
  getFilesForProjectHandler,
  getFilesTreeForProjectHandler
} from '../controllers/fileController.js';

const router = Router({ mergeParams: true });

router.use(auth);

router.post('/', asyncHandler(createFileHandler));
router.get('/', asyncHandler(getFilesForProjectHandler));
router.get('/tree', asyncHandler(getFilesTreeForProjectHandler));
router.get('/:fileId', asyncHandler(getFileHandler));
router.patch('/:fileId', asyncHandler(updateFileHandler));
router.delete('/:fileId', asyncHandler(deleteFileHandler));

export default router;