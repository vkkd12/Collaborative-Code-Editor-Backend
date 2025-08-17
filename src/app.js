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
if (process.env.NODE_ENV === 'production') {
  app.set("trust proxy", 1);
}

// Middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan('dev'));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'change-me-session-secret-at-least-32-chars',
  resave: false,
  proxy: process.env.NODE_ENV === 'production',
  saveUninitialized: false,
  cookie: {
    maxAge: Number(process.env.SESSION_COOKIE_MAX_AGE) || 86400000,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: String(process.env.SESSION_COOKIE_HTTP_ONLY || 'true') === 'true',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));

// CORS
const corsOrigin = (process.env.CORS_ORIGIN || '').split(',').filter(Boolean);
console.log('CORS Origin:', corsOrigin);
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || corsOrigin.length === 0 || corsOrigin.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: String(process.env.CORS_CREDENTIALS || 'true') === 'true'
}));

// Helmet
app.use(
  helmet({
    contentSecurityPolicy: String(process.env.HELMET_CONTENT_SECURITY_POLICY || (process.env.NODE_ENV === 'production' ? 'true' : 'false')) === 'true',
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
