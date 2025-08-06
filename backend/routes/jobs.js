//routes/jobs.js
import express from 'express';
import { 
  createJob, 
  getAllJobs, 
  getEmployerJobs,
  getJobById
} from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createJob);
router.get('/', getAllJobs);
router.get('/employer-jobs', protect, getEmployerJobs);
router.get('/:id', getJobById);

export default router;
