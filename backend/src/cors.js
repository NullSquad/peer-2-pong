import cors from 'cors';

const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
];

export const middleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin) || !origin) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
});