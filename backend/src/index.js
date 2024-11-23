import express from 'express';
import mongoose from 'mongoose';
import { corsMiddleware } from './cors.js';

const app = express();
const port = process.env.BACKEND_PORT || 5000;

app.use(corsMiddleware());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});