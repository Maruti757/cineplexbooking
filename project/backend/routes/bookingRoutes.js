import express from 'express';
import Booking from '../models/Booking.js';
import Movie from '../models/Movie.js';
import { sendBookingEmail } from '../config/email.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const showtimeIndex = movie.showtimes.findIndex(
      st => st.time === req.body.showtime
    );

    if (showtimeIndex === -1) {
      return res.status(400).json({ message: 'Invalid showtime' });
    }

    if (movie.showtimes[showtimeIndex].availableSeats < req.body.seats) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    movie.showtimes[showtimeIndex].availableSeats -= req.body.seats;
    await movie.save();

    const booking = new Booking({
      movieId: req.body.movieId,
      movieTitle: movie.title,
      showtime: req.body.showtime,
      seats: req.body.seats,
      totalPrice: req.body.totalPrice,
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      customerPhone: req.body.customerPhone,
      
    });

    const newBooking = await booking.save();

    await sendBookingEmail(newBooking, movie);

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
