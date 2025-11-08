import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/cineplex")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import and use routes
const setupRoutes = async () => {
  try {
    // Import movie routes
    const movieModule = await import("./routes/movieRoutes.js");
    app.use("/api/movies", movieModule.default);

    // Import booking routes
    const bookingModule = await import("./routes/bookingRoutes.js");
    app.use("/api/bookings", bookingModule.default);

    // Import contact routes
    const contactModule = await import("./routes/contact.js");
    app.use("/api/contact", contactModule.default);

    console.log("All routes loaded successfully");
  } catch (error) {
    console.error("Error loading routes:", error);
  }
};

setupRoutes();

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Cineplex Backend API is running!" });
});

// Health check route (keeping your original endpoint)
app.get("/api/health", (req, res) => {
  res.json({
    status: "Server is running",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString(),
  });
});

// Additional health endpoint for consistency
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
