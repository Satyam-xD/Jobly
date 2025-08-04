import Job from '../models/Job.js';

// Controller function to get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('createdBy', 'name email');
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: err.message });
  }
};

// Controller function to get a single job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('createdBy', 'name email');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch job', error: err.message });
  }
};

// Controller function to create a job
export const createJob = async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      createdBy: req.user.id
    });
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ message: 'Job creation failed', error: err.message });
  }
};

// Make sure to export all functions you want to use
export default {
  getAllJobs,
  getJobById,
  createJob
};