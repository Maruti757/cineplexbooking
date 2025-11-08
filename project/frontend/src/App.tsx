import { useState, useEffect } from "react";
import {
  Film,
  Clapperboard,
  Sparkles,
  Star,
  Ticket,
  Popcorn,
  Info,
  Mail,
  Home,
  User,
} from "lucide-react";
import MovieCard from "./components/MovieCard";
import BookingModal from "./components/BookingModal";
import BookingConfirmation from "./components/BookingConfirmation";
import AboutUs from "./components/aboutus"; // Fixed casing
import ContactUs from "./components/contactus";
import Footer from "./components/footer"; // Add Footer import
import { Movie, api } from "./services/api";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

type Page = "movies" | "about" | "contact";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState<Page>("movies");

  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();

  useEffect(() => {
    if (currentPage === "movies") {
      loadMovies();
    }
  }, [currentPage]);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await api.getMovies();
      setMovies(data);
      setError("");
    } catch (err) {
      setError(
        "Failed to load movies. Please ensure the backend server is running."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSuccess = (id: string) => {
    setBookingId(id);
    setSelectedMovie(null);
    loadMovies();
  };

  const handleSignIn = () => {
    openSignIn();
  };

  const renderContent = () => {
    switch (currentPage) {
      case "about":
        return <AboutUs />;
      case "contact":
        return <ContactUs />;
      case "movies":
      default:
        return (
          <>
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center transform group-hover:scale-105 transition-all duration-500">
                  <div className="text-4xl font-black text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {movies.length}
                  </div>
                  <div className="text-blue-200/80 font-semibold">
                    Blockbuster Movies
                  </div>
                  <Film className="w-8 h-8 text-blue-400/50 mx-auto mt-4" />
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center transform group-hover:scale-105 transition-all duration-500">
                  <div className="text-4xl font-black text-white mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {movies.reduce(
                      (total, movie) => total + movie.showtimes.length,
                      0
                    )}
                  </div>
                  <div className="text-purple-200/80 font-semibold">
                    Daily Showtimes
                  </div>
                  <Ticket className="w-8 h-8 text-purple-400/50 mx-auto mt-4" />
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center transform group-hover:scale-105 transition-all duration-500">
                  <div className="text-4xl font-black text-white mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    4K
                  </div>
                  <div className="text-cyan-200/80 font-semibold">
                    Premium Experience
                  </div>
                  <Star className="w-8 h-8 text-cyan-400/50 mx-auto mt-4" />
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-32">
                <div className="inline-block relative">
                  <div className="w-20 h-20 border-4 border-blue-500/30 rounded-full animate-spin"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin"></div>
                  <Film className="w-8 h-8 text-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <p className="text-blue-200/80 text-xl mt-6 font-light">
                  Preparing your cinematic journey...
                </p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-red-500/20 to-pink-500/10 backdrop-blur-2xl border border-red-400/30 text-white px-8 py-10 rounded-3xl text-center shadow-2xl">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Film className="w-8 h-8 text-red-400" />
                  </div>
                  <p className="font-bold text-2xl mb-3 bg-gradient-to-r from-red-200 to-pink-200 bg-clip-text text-transparent">
                    Connection Interrupted
                  </p>
                  <p className="text-red-200/80 mb-6 text-lg">{error}</p>
                  <button
                    onClick={loadMovies}
                    className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                  >
                    🔄 Retry Connection
                  </button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && movies.length === 0 && (
              <div className="text-center py-32 bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl">
                <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Film className="w-12 h-12 text-blue-400/60" />
                </div>
                <p className="text-3xl font-bold text-white mb-3">
                  No Movies Available
                </p>
                <p className="text-blue-200/60 text-lg max-w-md mx-auto">
                  We're preparing something spectacular for you. Check back soon
                  for new releases!
                </p>
              </div>
            )}

            {/* Movies Grid */}
            {!loading && !error && movies.length > 0 && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
                    NOW SHOWING
                  </h2>
                  <p className="text-blue-200/70 text-xl max-w-3xl mx-auto leading-relaxed">
                    Immerse yourself in the latest cinematic masterpieces. Book
                    your tickets instantly and experience movie magic like never
                    before.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie._id}
                      movie={movie}
                      onSelect={setSelectedMovie}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        );
    }
  };

  // Show loading state while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-500/30 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-200/80 text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full opacity-20 blur-3xl animate-pulse-slower"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-15 blur-3xl animate-float"></div>

        {/* Animated Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}

        {/* Floating Icons */}
        <div className="absolute top-20 left-10 text-yellow-400/20 animate-bounce-slow">
          <Popcorn className="w-8 h-8" />
        </div>
        <div className="absolute top-40 right-20 text-blue-400/20 animate-bounce-delayed">
          <Ticket className="w-6 h-6" />
        </div>
        <div className="absolute bottom-32 left-20 text-pink-400/20 animate-bounce-slower">
          <Star className="w-7 h-7" />
        </div>

        {/* Grid Pattern with Animation */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] animate-grid"></div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Enhanced Header */}
        <header className="bg-gradient-to-r from-black/40 via-purple-900/30 to-black/40 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-50 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 group">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                    <Film className="w-8 h-8 text-white" />
                  </div>
                  <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-ping" />
                </div>
                <div>
                  <h1 className="text-5xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                    CINEPLEX
                  </h1>
                  <p className="text-blue-200/80 mt-2 flex items-center gap-2 text-sm font-medium">
                    <Clapperboard className="w-4 h-4" />
                    Your Ultimate Movie Experience Awaits
                  </p>
                </div>
              </div>

              {/* Live Stats & Navigation */}
              <div className="hidden lg:flex items-center gap-6">
                {/* Stats */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {movies.length}
                  </div>
                  <div className="text-blue-200/70 text-xs">MOVIES</div>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {movies.reduce(
                      (total, movie) => total + movie.showtimes.length,
                      0
                    )}
                  </div>
                  <div className="text-blue-200/70 text-xs">SHOWTIMES</div>
                </div>
                <div className="w-px h-8 bg-white/20"></div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setCurrentPage("movies")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      currentPage === "movies"
                        ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
                        : "text-blue-200 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    Movies
                  </button>

                  <button
                    onClick={() => setCurrentPage("about")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      currentPage === "about"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "text-blue-200 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Info className="w-4 h-4" />
                    About Us
                  </button>

                  <button
                    onClick={() => setCurrentPage("contact")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      currentPage === "contact"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                        : "text-blue-200 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    Contact
                  </button>

                  {/* Login/User Button */}
                  {!user ? (
                    <button
                      onClick={handleSignIn}
                      className="bg-gradient-to-r from-green-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                    >
                      <User className="w-5 h-5" />
                      Login
                    </button>
                  ) : (
                    <UserButton />
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center gap-4">
                {user ? (
                  <UserButton />
                ) : (
                  <button
                    onClick={handleSignIn}
                    className="bg-gradient-to-r from-green-500 to-cyan-600 text-white p-2 rounded-lg"
                  >
                    <User className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex justify-center gap-4 mt-6 pt-6 border-t border-white/10">
              <button
                onClick={() => setCurrentPage("movies")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  currentPage === "movies"
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
                    : "text-blue-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <Home className="w-4 h-4" />
                Movies
              </button>

              <button
                onClick={() => setCurrentPage("about")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  currentPage === "about"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-blue-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <Info className="w-4 h-4" />
                About
              </button>

              <button
                onClick={() => setCurrentPage("contact")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  currentPage === "contact"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                    : "text-blue-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <Mail className="w-4 h-4" />
                Contact
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {renderContent()}
        </main>
      </div>

      {/* Modals */}
      {selectedMovie && (
        <BookingModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onSuccess={handleBookingSuccess}
        />
      )}

      {bookingId && (
        <BookingConfirmation
          bookingId={bookingId}
          onClose={() => setBookingId(null)}
        />
      )}

      {/* Add Footer Component */}
      <Footer />

      {/* Enhanced Animations */}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }
        @keyframes pulse-slower {
          0%,
          100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.25;
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes bounce-delayed {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes bounce-slower {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @keyframes grid {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(60px);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-bounce-delayed {
          animation: bounce-delayed 3.5s ease-in-out infinite;
        }
        .animate-bounce-slower {
          animation: bounce-slower 4s ease-in-out infinite;
        }
        .animate-grid {
          animation: grid 20s linear infinite;
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
