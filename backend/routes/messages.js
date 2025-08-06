//routes/messages.js
import express from 'express';
import { 
  createMessage,
  getConversations,
  getMessages
} from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createMessage);
router.get('/conversations', protect, getConversations);
router.get('/:userId', protect, getMessages);

export default router;