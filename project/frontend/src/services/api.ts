const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface Movie {
  _id: string;
  title: string;
  description: string;
  genre: string;
  duration: number;
  language: string;
  rating: number;
  releaseDate: string;
  posterUrl: string;
  showtimes: Showtime[];
}

export interface Showtime {
  time: string;
  availableSeats: number;
  price: number;
}

export interface BookingData {
  movieId: string;
  showtime: string;
  seats: number;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  selectedSeats: string[];
  movieTitle: string;
}

export interface Booking extends BookingData {
  _id: string;
  movieTitle: string;
  bookingDate: string;
  status: string;
}

export const api = {
  async getMovies(): Promise<Movie[]> {
    const response = await fetch(`${API_URL}/movies`);
    if (!response.ok) throw new Error('Failed to fetch movies');
    return response.json();
  },

  async getMovie(id: string): Promise<Movie> {
    const response = await fetch(`${API_URL}/movies/${id}`);
    if (!response.ok) throw new Error('Failed to fetch movie');
    return response.json();
  },
  
    submitContact: async (contactData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<{ message: string }> => {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }
    
    return response.json();
  },


  async createBooking(bookingData: BookingData): Promise<Booking> {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create booking');
    }
    return response.json();
  },

  async getBooking(id: string): Promise<Booking> {
    const response = await fetch(`${API_URL}/bookings/${id}`);
    if (!response.ok) throw new Error('Failed to fetch booking');
    return response.json();
  }
};
