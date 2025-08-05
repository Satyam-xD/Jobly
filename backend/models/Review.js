// routes/reviews.js
import express from 'express';
import { 
  createReview, 
  getReviewsForFreelancer 
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:jobId', protect, createReview);
router.get('/freelancer/:id', getReviewsForFreelancer);

export default router;