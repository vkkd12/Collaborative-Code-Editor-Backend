import crypto from 'crypto';

export function toJSONSafe(doc) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject({ versionKey: false }) : doc;
  delete obj.password;
  delete obj.__v;
  return obj;
}

export function sha256(data) {
  return crypto.createHash('sha256').update(String(data)).digest('hex');
}

export const asyncHandler = (fn) => (req, res, next) => {
  console.log('asyncHandler reached');
  return Promise.resolve(fn(req, res, next)).catch(next);
};