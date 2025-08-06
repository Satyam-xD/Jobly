//models/Job.js

import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skillsRequired: [String],
  location: String,
  salary: Number,
  isRemote: Boolean
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;