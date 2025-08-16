import { Router } from 'express';
import auth from '../middleware/auth.js';
import { asyncHandler } from '../utils/helpers.js';
import {
  createProject,
  listProjects,
  getProjectById,
  updateProject,
  deleteProject,
  joinProject,
  leaveProject
} from '../controllers/projectController.js';

const router = Router();

router.use(auth);

router.post('/', asyncHandler(createProject));
router.get('/', asyncHandler(listProjects));
router.get('/:projectId', asyncHandler(getProjectById));
router.patch('/:projectId', asyncHandler(updateProject));
router.delete('/:projectId', asyncHandler(deleteProject));
router.post('/join', asyncHandler(joinProject));
router.post('/leave', asyncHandler(leaveProject));

export default router;