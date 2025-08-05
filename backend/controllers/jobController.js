// controllers/jobController.js
import Job from '../models/Job.js';
import Application from '../models/Application.js';

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'open' })
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });
    
    res.json({ 
      success: true,
      count: jobs.length,
      jobs 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('createdBy', 'name email bio')
      .populate('assignedFreelancer', 'name email bio');

    if (!job) {
      return res.status(404).json({ 
        success: false,
        message: 'Job not found' 
      });
    }

    res.json({ 
      success: true,
      job 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Create job
// @route   POST /api/jobs
// @access  Private (Client)
export const createJob = async (req, res) => {
  try {
    const { title, description, budget, category, deadline, location, skillsRequired } = req.body;

    const job = await Job.create({
      title,
      description,
      budget,
      category,
      deadline,
      location,
      skillsRequired: skillsRequired.split(',').map(skill => skill.trim()),
      createdBy: req.user.id
    });

    res.status(201).json({ 
      success: true,
      job 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: 'Job creation failed',
      error: error.message 
    });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Job Owner)
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!job) {
      return res.status(404).json({ 
        success: false,
        message: 'Job not found' 
      });
    }

    res.json({ 
      success: true,
      job 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: 'Job update failed',
      error: error.message 
    });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Job Owner)
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ 
        success: false,
        message: 'Job not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Job deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Get jobs posted by user
// @route   GET /api/jobs/user
// @access  Private (Client)
export const getUserJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id })
      .populate('assignedFreelancer', 'name email')
      .sort({ createdAt: -1 });

    res.json({ 
      success: true,
      count: jobs.length,
      jobs 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};