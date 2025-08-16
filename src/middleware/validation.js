export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(
    { body: req.body },
    { abortEarly: false }
  );
  if (error) return res.status(400).json({ success: false, errors: error.details.map((d) => d.message) });
  req.validated = value;
  return next();
};