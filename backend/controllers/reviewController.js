import Review from '../models/Review.js';
import Job from '../models/Job.js';

export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId);
    if (!job || job.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to review this job' });
    }

    const review = await Review.create({
      job: job._id,
      client: req.user._id,
      freelancer: job.applicants[0], // assuming only one accepted applicant
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create review', error: err.message });
  }
};

export const getReviewsForFreelancer = async (req, res) => {
  try {
    const reviews = await Review.find({ freelancer: req.params.id })
      .populate('client', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: err.message });
  }
};
