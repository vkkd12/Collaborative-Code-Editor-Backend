import mongoose from 'mongoose';
import logger from './logger.js';

export async function connectMongo(uri) {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, {
      maxPoolSize: Number(process.env.MONGODB_MAX_CONNECTIONS || 10),
      minPoolSize: Number(process.env.MONGODB_MIN_CONNECTIONS || 5),
    });
    logger.info('utils/database.js >> MongoDB connected');
  } catch (err) {
    logger.error({ msg: 'MongoDB connection error', err });
    throw err;
  }
}