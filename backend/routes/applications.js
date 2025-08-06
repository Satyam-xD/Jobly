//routes/applications.js


import express from 'express';
import { 
  applyToJob, 
  getJobseekerApplications,
  getApplicationById,
  updateApplicationStatus  // Add this
} from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, applyToJob);
router.get('/my-applications', protect, getJobseekerApplications);
router.get('/:id', protect, getApplicationById);
router.put('/:id/status', protect, updateApplicationStatus); // Add this route

export default router;