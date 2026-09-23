// CORS policy — open in development, locked to CLIENT_URL in production.
export function corsOrigin(origin, callback) {
  if (!origin || process.env.NODE_ENV !== 'production') {
    return callback(null, true);
  }
  const allowed = (process.env.CLIENT_URL || '')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean);
  if (allowed.includes(origin)) return callback(null, true);
  callback(new Error('Not allowed by CORS'));
}
