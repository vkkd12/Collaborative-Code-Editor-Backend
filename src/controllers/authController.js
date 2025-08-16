import Joi from 'joi';
import { register, login } from '../services/authService.js';
import { toJSONSafe } from '../utils/helpers.js';

export const registerSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
  })
});

export const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
});

export async function registerHandler(req, res) {
  const user = await register(req.body);
  res.status(201).json({ success: true, data: toJSONSafe(user) });
}

export async function loginHandler(req, res, next) {
  try {
    const { user } = await login(req.body);
    req.session.user = toJSONSafe(user);

    req.session.save(err => {
      if (err) {
        console.error("Session save error:", err);
        return next(err);
      }

      // Debug: log Set-Cookie after save
      console.log("Session after save:", req.session);
      console.log("Set-Cookie header:", res.getHeader("Set-Cookie"));

      res.json({
        success: true,
        data: { user: toJSONSafe(user) }
      });
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "ServerSide Login failed"
    });
  }
}
