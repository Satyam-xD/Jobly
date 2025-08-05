const Job = require('../models/Job');
const Application = require('../models/Application');

const checkJobOwnership = async (req, res, next) => {
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

const checkApplicationOwnership = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ 
        success: false,
        message: 'Application not found' 
      });
    }

    if (application.applicant.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to modify this application' 
      });
    }

    req.application = application;
    next();
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Server error during ownership verification',
      error: err.message 
    });
  }
};

module.exports = { checkJobOwnership, checkApplicationOwnership };