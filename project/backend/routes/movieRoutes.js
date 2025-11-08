import express from 'express';
import Movie from '../models/Movie.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ releaseDate: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const movie = new Movie(req.body);
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/:id/showtime/:showtimeIndex', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const showtimeIndex = parseInt(req.params.showtimeIndex);
    if (showtimeIndex >= 0 && showtimeIndex < movie.showtimes.length) {
      movie.showtimes[showtimeIndex].availableSeats -= req.body.seatsBooked;
      await movie.save();
      res.json(movie);
    } else {
      res.status(400).json({ message: 'Invalid showtime index' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
