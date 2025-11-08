import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  subject: {
    type: String,
    required: [true, "Subject is required"],
    trim: true,
    maxlength: 200,
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    maxlength: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Contact", contactSchema);
