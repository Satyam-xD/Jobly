import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  role: { type: String, enum: ['jobseeker', 'employer'], default: 'jobseeker' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
