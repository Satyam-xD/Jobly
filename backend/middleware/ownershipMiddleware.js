import Job from '../models/Job.js';

export const checkJobOwnership = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ 
        success: false,
        message: 'Job not found' 
      });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to modify this job' 
      });
    }

    req.job = job;
    next();
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Server error during ownership verification',
      error: err.message 
    });
  }
};