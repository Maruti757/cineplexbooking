# Movie Ticket Booking System

A full-stack movie ticket booking application built with the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

```
project/
├── backend/          # Express.js backend server
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── server.js     # Main server file
│   ├── seed.js       # Database seeding script
│   └── .env          # Backend environment variables
└── frontend/         # React frontend application
    ├── src/
    │   ├── components/   # React components
    │   ├── services/     # API service layer
    │   └── App.tsx       # Main App component
    └── .env              # Frontend environment variables
```

## Features

- Browse available movies
- View movie details with ratings, duration, and genre
- Select showtimes and book tickets
- Real-time seat availability tracking
- Customer information collection
- Booking confirmation system
- Email notifications with booking details (Nodemailer)
- Professional HTML email templates
- Automatic email confirmation to customer email

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally on default port 27017)

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure MongoDB is running locally

4. Seed the database with sample movies:
   ```bash
   node seed.js
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

   The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on http://localhost:5173

## API Endpoints

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get a specific movie
- `POST /api/movies` - Add a new movie
- `PATCH /api/movies/:id/showtime/:showtimeIndex` - Update seat availability

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get a specific booking
- `POST /api/bookings` - Create a new booking

## Technologies Used

### Backend
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM for MongoDB
- Nodemailer - Email service
- CORS - Cross-origin resource sharing
- dotenv - Environment variable management

### Frontend
- React - UI library
- TypeScript - Type safety
- Vite - Build tool
- Tailwind CSS - Styling
- Lucide React - Icons

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/moviebooking
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM_NAME=MovieBox
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Email Configuration

The system automatically sends confirmation emails with booking details. See [EMAIL_SETUP.md](./EMAIL_SETUP.md) for detailed instructions on configuring email services (Gmail, Outlook, etc.).

### Quick Setup (Gmail)
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password in Google Account Security
3. Update `.env` with your Gmail address and app password
4. Restart the backend server

## Usage

1. Start MongoDB locally
2. Configure email settings in `.env` (see EMAIL_SETUP.md)
3. Run the backend server
4. Seed the database with sample movies
5. Start the frontend development server
6. Open your browser to http://localhost:5173
7. Browse movies and make bookings
8. Check email for booking confirmation

## Database Schema

### Movie Model
- title: String
- description: String
- genre: String
- duration: Number
- language: String
- rating: Number
- releaseDate: Date
- posterUrl: String
- showtimes: Array of { time, availableSeats, price }

### Booking Model
- movieId: ObjectId (ref: Movie)
- movieTitle: String
- showtime: String
- seats: Number
- totalPrice: Number
- customerName: String
- customerEmail: String
- customerPhone: String
- bookingDate: Date
- status: String (confirmed/cancelled)
