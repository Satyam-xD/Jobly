import Job from '../models/Job.js';

// Create Job (Working Version)
export const createJob = async (req, res) => {
  try {
    const { title, description, budget } = req.body;
    
    const job = new Job({
      title,
      description,
      budget,
      createdBy: req.user.id
    });

    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ 
      success: false,
      message: 'Job creation failed',
      error: err.message 
    });
  }
};

// Get All Jobs (Working Version)
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('createdBy', 'name');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch jobs',
      error: err.message 
    });
  }
};