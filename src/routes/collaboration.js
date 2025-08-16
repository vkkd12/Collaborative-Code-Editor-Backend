import { Router } from 'express';
import auth from '../middleware/auth.js';
import { asyncHandler } from '../utils/helpers.js';
import { applyOp } from '../controllers/collaborationController.js';

const router = Router();

router.use(auth);

router.post('/op', asyncHandler(applyOp));

export default router;