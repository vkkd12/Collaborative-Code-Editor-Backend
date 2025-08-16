import rateLimit from 'express-rate-limit';

const unlimited = (req, res, next) => next();
export const apiLimiter = process.env.NODE_ENV === 'development'
  ? unlimited
  : rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
    max: Number(process.env.RATE_LIMIT_MAX_REQUESTS || 1000),
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: String(process.env.RATE_LIMIT_SKIP_SUCCESSFUL_REQUESTS || 'false') === 'true',
  });

export const authLimiter = process.env.NODE_ENV === 'development'
  ? unlimited
  : rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_AUTH_WINDOW_MS || 15 * 60 * 1000),
    max: Number(process.env.RATE_LIMIT_AUTH_MAX_REQUESTS || 5),
    standardHeaders: true,
    legacyHeaders: false,
  });