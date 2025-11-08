import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendBookingEmail = async (booking, movie) => {
  try {
    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_USER}>`,
      to: booking.customerEmail,
      subject: 'Booking Confirmation - MovieBox',
      html: generateBookingEmailHTML(booking, movie),
    };

    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

const generateBookingEmailHTML = (booking, movie) => {
  const bookingDate = new Date(booking.bookingDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const bookingTime = new Date(booking.bookingDate).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 6px 6px 0 0;
          margin: -20px -20px 20px -20px;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
        }
        .confirmation-id {
          background-color: #f0f0f0;
          padding: 15px;
          border-radius: 6px;
          margin: 20px 0;
          border-left: 4px solid #667eea;
        }
        .confirmation-id p {
          margin: 5px 0;
          font-size: 14px;
        }
        .confirmation-id .id {
          font-weight: bold;
          font-size: 18px;
          color: #667eea;
          font-family: monospace;
        }
        .details-section {
          margin: 25px 0;
        }
        .details-section h2 {
          font-size: 18px;
          color: #333;
          border-bottom: 2px solid #667eea;
          padding-bottom: 10px;
          margin-bottom: 15px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .detail-label {
          font-weight: bold;
          color: #555;
          width: 40%;
        }
        .detail-value {
          color: #333;
          width: 60%;
          text-align: right;
        }
        .price-section {
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 6px;
          margin: 20px 0;
        }
        .price-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-top: 2px solid #ddd;
          margin-top: 10px;
          font-weight: bold;
          font-size: 16px;
          color: #667eea;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #888;
          font-size: 12px;
        }
        .warning {
          background-color: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 12px;
          border-radius: 4px;
          margin: 20px 0;
          font-size: 13px;
          color: #856404;
        }
        .button {
          display: inline-block;
          margin-top: 20px;
          padding: 12px 30px;
          background-color: #667eea;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎬 Booking Confirmed!</h1>
          <p>Your movie tickets have been booked successfully</p>
        </div>

        <div class="confirmation-id">
          <p>Booking Reference Number</p>
          <p class="id">${booking._id}</p>
        </div>

        <div class="details-section">
          <h2>Movie Details</h2>
          <div class="detail-row">
            <span class="detail-label">Movie Title</span>
            <span class="detail-value">${booking.movieTitle}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Genre</span>
            <span class="detail-value">${movie.genre}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Duration</span>
            <span class="detail-value">${movie.duration} minutes</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Language</span>
            <span class="detail-value">${movie.language}</span>
          </div>
        </div>

        <div class="details-section">
          <h2>Booking Details</h2>
          <div class="detail-row">
            <span class="detail-label">Showtime</span>
            <span class="detail-value">${booking.showtime}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Number of Seats</span>
            <span class="detail-value">${booking.seats}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Booking Date</span>
            <span class="detail-value">${bookingDate} at ${bookingTime}</span>
          </div>
        </div>

        <div class="details-section">
          <h2>Customer Information</h2>
          <div class="detail-row">
            <span class="detail-label">Name</span>
            <span class="detail-value">${booking.customerName}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Email</span>
            <span class="detail-value">${booking.customerEmail}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Phone</span>
            <span class="detail-value">${booking.customerPhone}</span>
          </div>
        </div>

        <div class="price-section">
          <div class="price-row">
            <span>Price per seat</span>
            <span>₹${(booking.totalPrice / booking.seats).toFixed(2)}</span>
          </div>
          <div class="price-row">
            <span>Number of seats</span>
            <span>× ${booking.seats}</span>
          </div>
          <div class="total-row">
            <span>Total Amount</span>
            <span>₹${booking.totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div class="warning">
          <strong>Important:</strong> Please arrive at least 15 minutes before your showtime. Present this email or booking reference number at the counter for ticket verification.
        </div>

        <div style="text-align: center;">
          <a href="https://moviebox.example.com" class="button">View Booking</a>
        </div>

        <div class="footer">
          <p>Thank you for choosing MovieBox!</p>
          <p>If you have any questions, please contact our support team at support@moviebox.com</p>
          <p>&copy; 2024 MovieBox. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
