// routes/applications.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
  createApplication,
  getFreelancerApplications,
  getJobApplications,
  updateApplicationStatus
} from '../controllers/applicationController.js';

const router = express.Router();

router.post('/', protect, createApplication);
router.get('/', protect, getFreelancerApplications);
router.get('/job/:jobId', protect, getJobApplications);
router.put('/:id/status', protect, updateApplicationStatus);

export default router;