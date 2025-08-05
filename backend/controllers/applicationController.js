import Application from '../models/Application.js';

export const createApplication = async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
