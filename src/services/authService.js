import User from '../models/User.js';

export async function register({ email, username, password }) {
  const exists = await User.findOne({ $or: [{ email }, { username }] });
  if (exists) {
    const err = new Error('Email or username already in use');
    err.status = 409;
    throw err;
  }
  const user = await User.create({ email, username, password });
  return user;
}

export async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }
  return { user };
}