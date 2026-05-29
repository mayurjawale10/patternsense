// Global Express error handler — safe messages in production.
import mongoose from 'mongoose';

export function errorMiddleware(err, req, res, next) {
  if (res.headersSent) return next(err);

  console.error(err);

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  if (err?.code === 11000) {
    return res.status(409).json({ error: 'Duplicate record conflict' });
  }

  const status = err.status || err.statusCode || 500;
  const message = status === 500 && process.env.NODE_ENV === 'production'
    ? 'Something went wrong. Please try again.'
    : (err.message || 'Something went wrong. Please try again.');

  res.status(status).json({ error: message });
}

export function notFoundMiddleware(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
}
