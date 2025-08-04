import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  coverLetter: String,
  status: { type: String, default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);
