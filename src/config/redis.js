export default {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT || 6379),
  password: process.env.REDIS_PASSWORD || undefined,
  db: Number(process.env.REDIS_DB || 0),
  keyPrefix: process.env.REDIS_KEY_PREFIX || 'collab_editor:',
  sessionPrefix: process.env.REDIS_SESSION_PREFIX || 'session:',
  connectTimeout: Number(process.env.REDIS_CONNECTION_TIMEOUT || 5000),
  commandTimeout: Number(process.env.REDIS_COMMAND_TIMEOUT || 3000),
};