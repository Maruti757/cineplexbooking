import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// Submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const contact = new Contact({
      name,
      email,
      subject,
      message,
    });

    await contact.save();
    res.status(201).json({
      message: "Contact form submitted successfully!",
      id: contact._id,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Failed to submit contact form" });
  }
});

// Get all contact submissions (for admin)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

export default router;
