import { Router } from 'express';
import { validate } from '../middleware/validation.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import {
  loginHandler,
  loginSchema,
  registerHandler,
  registerSchema
} from '../controllers/authController.js';

const router = Router();

router.post('/register', authLimiter, validate(registerSchema), registerHandler);
router.post('/login', authLimiter, validate(loginSchema), loginHandler);

router.get('/me', (req, res) => {
  if (req.session.user) {
    return res.json({ success: true, data: req.session.user });
  }
  return res.status(401).json({ success: false, message: 'Not authenticated' });
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // default cookie name
    return res.json({ success: true, message: 'Logged out' });
  });
});

export default router;