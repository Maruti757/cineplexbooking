import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  releaseDate: {
    type: Date,
    required: true
  },
  posterUrl: {
    type: String,
    required: true
  },
  showtimes: [{
    time: String,
    price: {
      type: Number,
      required: true
    }
  }]
}, {
  timestamps: true
});

export default mongoose.model('Movie', movieSchema);
