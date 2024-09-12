import express from 'express';

const router = express.Router();

// Define the root route ("/") and return a JSON response
router.get('/', (req, res) => {
  res.json({ message: 'hello world' });
});

export default router;
