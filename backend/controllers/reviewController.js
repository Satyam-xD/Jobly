// controllers/reviewController.js
import Review from '../models/Review.js';
import Job from '../models/Job.js';

// @desc    Create review
// @route   POST /api/reviews/:jobId
// @access  Private (Client)
export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ 
        success: false,
        message: 'Job not found' 
      });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to review this job' 
      });
    }

    const review = await Review.create({
      job: job._id,
      client: req.user._id,
      freelancer: job.assignedFreelancer,
      rating,
      comment
    });

    res.status(201).json({ 
      success: true,
      review 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Get reviews for freelancer
// @route   GET /api/reviews/freelancer/:id
// @access  Public
export const getReviewsForFreelancer = async (req, res) => {
  try {
    const reviews = await Review.find({ freelancer: req.params.id })
      .populate('client', 'name')
      .populate('job', 'title')
      .sort({ createdAt: -1 });

    res.json({ 
      success: true,
      count: reviews.length,
      reviews 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};