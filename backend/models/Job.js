import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  company: String,
  location: String,
  type: { type: String, enum: ['full-time', 'part-time', 'contract'] },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
