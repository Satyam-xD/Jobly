// routes/savedJobs.js

import express from 'express';
import {
  saveJob,
  getSavedJobs,
  removeSavedJob,
  checkSavedJob
} from '../controllers/savedJobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, saveJob);
router.get('/', protect, getSavedJobs);
router.delete('/:id', protect, removeSavedJob);
router.get('/check', protect, checkSavedJob); // ✅ Added check route

export default router;
