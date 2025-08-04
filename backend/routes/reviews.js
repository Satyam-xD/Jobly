import express from 'express';
import { createReview, getReviewsForFreelancer } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:jobId', protect, createReview); // client submits review for job
router.get('/freelancer/:id', protect, getReviewsForFreelancer); // get freelancer's reviews

export default router;
