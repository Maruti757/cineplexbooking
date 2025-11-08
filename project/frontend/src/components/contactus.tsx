import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { api } from "../services/api";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.submitContact(formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Cinema Street", "Movie City, MC 12345"],
      description: "Main Headquarters",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Mon-Sun, 8AM-11PM",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["support@cineplex.com", "bookings@cineplex.com"],
      description: "We reply within 24 hours",
    },
    {
      icon: Clock,
      title: "Opening Hours",
      details: ["Monday - Sunday: 10AM - 2AM", "Holidays: 12PM - 12AM"],
      description: "365 days a year",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
          Contact Us
        </h1>
        <p className="text-blue-200/70 text-xl max-w-3xl mx-auto leading-relaxed">
          Have questions or feedback? We'd love to hear from you. Get in touch
          with our friendly team and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-6">
          {contactInfo.map((item, index) => (
            <div key={index} className="group">
              <div className="bg-gradient-to-br from-slate-900/50 to-purple-900/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 transform group-hover:scale-105 transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-blue-200/70 mb-1">
                        {detail}
                      </p>
                    ))}
                    <p className="text-blue-200/50 text-sm mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-gradient-to-br from-slate-900/50 to-blue-900/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-2">
            Send us a Message
          </h2>
          <p className="text-blue-200/70 mb-8">
            Fill out the form below and we'll get back to you shortly.
          </p>

          {/* Success Message */}
          {isSubmitted && (
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-400/30 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <div>
                  <h3 className="text-green-400 font-bold text-lg">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-green-200/80">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Subject *
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subject: e.target.value }))
                }
                className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What is this regarding?"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                rows={6}
                className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Tell us how we can help you..."
                required
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
