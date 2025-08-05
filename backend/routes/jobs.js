import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createJob, getAllJobs } from '../controllers/jobController.js';

const router = express.Router();

router.route('/')
  .get(getAllJobs)
  .post(protect, createJob);

export default router;