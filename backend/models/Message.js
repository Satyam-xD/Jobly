import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { sendMessage, getMessages } from '../controllers/messageController.js';

const router = express.Router();

router.post('/', protect, sendMessage);
router.get('/:jobId', protect, getMessages);
router.get('/inbox', protect, (req, res) => {
  res.json({ message: `Hello user ${req.user.id}, this is your inbox` });
});

export default router;