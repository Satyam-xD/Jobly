const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Job = require('../models/Job');

// @route GET /api/jobs
// @desc Get all jobs (public)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('createdBy', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route POST /api/jobs
// @desc Post a new job (private)
router.post('/', protect, async (req, res) => {
  const { title, description, budget, category, deadline, location, skillsRequired } = req.body;
  if (!title || !description || !budget || !category) {
    return res.status(400).json({ message: 'Please provide required fields' });
  }
  try {
    const job = new Job({
      title,
      description,
      budget,
      category,
      deadline,
      location,
      skillsRequired,
      createdBy: req.user._id
    });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route GET /api/jobs/user
// @desc Get jobs posted by logged-in client
router.get('/user', protect, async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user._id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
export default jobs;
