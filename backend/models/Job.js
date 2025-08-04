import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  category: { type: String, required: true },
  deadline: { type: Date },
  location: { type: String },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  skillsRequired: [{ type: String }],
  status: { 
    type: String, 
    enum: ['open', 'assigned', 'completed'],
    default: 'open'
  }
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);