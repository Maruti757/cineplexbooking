import {
  Film,
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      icon: Facebook,
      href: "https://m.facebook.com/Cineplex/",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/cineplexmovies?igsh=MXA0dHoydDkyZGRvMA==",
      label: "Instagram",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/watch?v=76bekocc9s8",
      label: "YouTube",
    },
  ];

  const contactInfo = [
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: Mail, text: "support@cineplex.com" },
    { icon: MapPin, text: "123 Cinema Street, Hubli" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 border-t border-white/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:20px_20px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl shadow-2xl">
                <Film className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                CINEPLEX
              </h3>
            </div>
            <p className="text-blue-200/70 mb-6 leading-relaxed">
              Experience cinema like never before. Premium theaters,
              state-of-the-art technology, and unforgettable moments await you
              at Cineplex.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-bold text-lg mb-6">Contact Info</h4>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-blue-200/70 group-hover:text-white transition-colors">
                    {info.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-bold text-lg mb-6">Stay Updated</h4>
            <p className="text-blue-200/70 mb-4">
              Subscribe to get notifications about new movies and special
              offers.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <button className="bg-gradient-to-r from-green-500 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 transform">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-blue-200/70">
              <span>© {currentYear} Cineplex. All rights reserved.</span>
              <span className="flex items-center gap-1">
                Made with{" "}
                <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" />{" "}
                for movie lovers
              </span>
            </div>
          </div>
        </div>
        {/* Floating Elements */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-10 blur-2xl"></div>
      </div>

      {/* Mobile App CTA */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="text-white font-bold text-xl mb-2">
                Get the Cineplex App
              </h4>
              <p className="text-blue-200/70">
                Book tickets faster, get exclusive offers, and never miss a
                premiere.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="bg-black/80 hover:bg-black text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M17.924 17.315c-.542.997-1.078 1.918-1.71 1.918-.593 0-.78-.585-1.616-.585-.844 0-1.063.585-1.727.585-.664 0-1.204-.945-1.742-1.938-.95-1.637-1.677-4.26-.79-6.099.543-1.127 1.524-1.813 2.553-1.813.664 0 1.293.427 1.742.427.45 0 1.164-.427 2.027-.427.856 0 1.66.427 2.168 1.226-1.924 1.043-1.622 3.737.328 4.477-.406.93-.938 1.855-1.593 2.904zm-3.014-11.33c-.58.702-1.14 1.678-.997 2.658.824.066 1.855-.53 2.47-1.234.58-.67 1.02-1.663.885-2.643-.895.053-1.894.593-2.358 1.219z"
                  />
                </svg>
                App Store
              </button>
              <button className="bg-black/80 hover:bg-black text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.189 9.186a1 1 0 0 1 1.414 0l6.323 6.323a1 1 0 0 1 0 1.414l-6.323 6.323a1 1 0 0 1-1.414-1.414L19.5 12l-5.682-5.682a1 1 0 0 1 0-1.414z"
                  />
                </svg>
                Google Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
