// controllers/applicationController.js

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Freelancer)
export const createApplication = async (req, res) => {
  try {
    const { job, coverLetter, proposedRate } = req.body;

    // Check if job exists
    const jobExists = await Job.findById(job);
    if (!jobExists) {
      return res.status(404).json({ 
        success: false,
        message: 'Job not found' 
      });
    }

    // Check if user already applied
    const alreadyApplied = await Application.findOne({
      job,
      applicant: req.user.id
    });

    if (alreadyApplied) {
      return res.status(400).json({ 
        success: false,
        message: 'You have already applied for this job' 
      });
    }

    const application = await Application.create({
      job,
      applicant: req.user.id,
      coverLetter,
      proposedRate
    });

    res.status(201).json({ 
      success: true,
      application 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// Make sure to export all other functions used in routes too
export const getFreelancerApplications = async (req, res) => {
  // implementation
};

export const getJobApplications = async (req, res) => {
  // implementation
};

export const updateApplicationStatus = async (req, res) => {
  // implementation
};