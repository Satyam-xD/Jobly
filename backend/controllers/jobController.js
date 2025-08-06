// controllers/jobController.js
import Job from '../models/Job.js';

export const createJob = async (req, res) => {
  try {
    const { title, description, company, skillsRequired, location, salary, isRemote } = req.body;
    
    const job = await Job.create({
      title,
      description,
      company,
      employer: req.user.id,
      skillsRequired,
      location,
      salary,
      isRemote
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: 'Job creation failed', error });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('employer', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employer', 'name email');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};