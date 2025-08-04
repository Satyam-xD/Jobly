import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/inbox', protect, (req, res) => {
  // This route is protected, req.user is available here
  res.json({ message: `Hello user ${req.user.id}, this is your inbox` });
});

export default router;
