import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
  getAllJobs,
  getJobById,
  createJob
} from '../controllers/jobController.js';

const router = express.Router();

router.route('/')
  .get(getAllJobs)
  .post(protect, createJob);

router.route('/:id')
  .get(getJobById);

export default router;