import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  happiness: {
    type: String,
    required: false,
  },
  learning: {
    type: String,
    required: false,
  },
  challenge: {
    type: String,
    required: false,
  },
  freeNote: {
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Entry || mongoose.model('Entry', entrySchema); 