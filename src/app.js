import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { apiLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import appConfig from './config/app.js';
import { connectMongo } from './utils/database.js';
import routesAuth from './routes/auth.js';
import routesProjects from './routes/projects.js';
import routesFiles from './routes/files.js';
import routesCollab from './routes/collaboration.js';
import "dotenv/config.js";


const app = express();
app.set("trust proxy", 1);

// Middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan('dev'));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'change-me-session-secret-at-least-32-chars',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: Number(process.env.SESSION_COOKIE_MAX_AGE) || 86400000, // 1 day
    secure: process.env.NODE_ENV === 'production', // must be true in production
    httpOnly: true,                                // keep true
    sameSite: 'none'                               // required for cross-site cookies
  },
  store: process.env.NODE_ENV === 'production'
    ? MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
    : undefined
}));

// CORS
const corsOrigin = (process.env.CORS_ORIGIN || '').split(',').filter(Boolean);
console.log('CORS Origin:', corsOrigin);
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || corsOrigin.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Helmet
app.use(
  helmet({
    contentSecurityPolicy: String(process.env.HELMET_CONTENT_SECURITY_POLICY || 'false') === 'true',
    crossOriginEmbedderPolicy: false
  })
);

// Rate limiting
app.use('/api', apiLimiter);

// Health check
app.get(`/api/${appConfig.apiVersion}/health`, (req, res) => res.json({ ok: true }));

// Routes
app.use(`/api/${appConfig.apiVersion}/auth`, routesAuth);
app.use(`/api/${appConfig.apiVersion}/projects`, routesProjects);
app.use(`/api/${appConfig.apiVersion}/projects/:projectId/files`, routesFiles);
app.use(`/api/${appConfig.apiVersion}/collab`, routesCollab);

// Error handler
app.use(errorHandler);

// Initialize MongoDB
export async function init() {
  await connectMongo(process.env.MONGODB_URI);
  return app;
}

export default app;
