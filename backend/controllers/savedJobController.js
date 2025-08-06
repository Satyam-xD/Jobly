//controllers/savedjobController.js


// controllers/savedJobController.js

import SavedJob from '../models/SavedJob.js';
import Job from '../models/Job.js';

export const saveJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const existingSave = await SavedJob.findOne({
      job: jobId,
      user: req.user.id
    });

    if (existingSave) {
      return res.status(400).json({ message: 'Job already saved' });
    }

    const savedJob = await SavedJob.create({
      job: jobId,
      user: req.user.id
    });

    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getSavedJobs = async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({ user: req.user.id }).populate('job');
    res.json(savedJobs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const removeSavedJob = async (req, res) => {
  try {
    const savedJob = await SavedJob.findById(req.params.id);

    if (!savedJob) {
      return res.status(404).json({ message: 'Saved job not found' });
    }

    if (savedJob.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await savedJob.remove();

    res.json({ message: 'Saved job removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const checkSavedJob = async (req, res) => {
  try {
    const { jobId } = req.query;

    const saved = await SavedJob.findOne({
      job: jobId,
      user: req.user.id
    });

    res.json({ isSaved: !!saved });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
