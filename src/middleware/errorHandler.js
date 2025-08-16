import { StatusCodes } from 'http-status-codes';
import logger from '../utils/logger.js';

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';
  if (status >= 500) logger.error({ msg: 'Unhandled error', err });
  res.status(status).json({ success: false, message });
}