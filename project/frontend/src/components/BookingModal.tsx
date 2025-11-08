import { useState, useEffect } from "react";
import { X, Clock, Users, CreditCard } from "lucide-react";
import { Movie, BookingData, api } from "../services/api";

interface BookingModalProps {
  movie: Movie;
  onClose: () => void;
  onSuccess: (bookingId: string) => void;
}

interface Seat {
  row: string;
  number: number;
  isBooked: boolean;
  type: "standard" | "premium";
}

export default function BookingModal({
  movie,
  onClose,
  onSuccess,
}: BookingModalProps) {
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [seatLayout, setSeatLayout] = useState<Seat[]>([]);
  const [fetchingSeats, setFetchingSeats] = useState(false);

  const selectedShowtimeData = movie.showtimes.find(
    (st) => st.time === selectedShowtime
  );
  const standardPrice = selectedShowtimeData?.price || 0;
  const premiumPrice = standardPrice * 1.5; // Premium seats cost 50% more
  const totalPrice = selectedSeats.reduce((total, seatId) => {
    const seat = seatLayout.find((s) => `${s.row}${s.number}` === seatId);
    return total + (seat?.type === "premium" ? premiumPrice : standardPrice);
  }, 0);

  // Generate or fetch seat layout when showtime is selected
  useEffect(() => {
    if (selectedShowtime) {
      setFetchingSeats(true);
      setSelectedSeats([]);

      // Simulate API call to get seat availability
      setTimeout(() => {
        generateSeatLayout();
        setFetchingSeats(false);
      }, 500);
    }
  }, [selectedShowtime]);

  const generateSeatLayout = () => {
    const rows = ["A", "B", "C", "D", "E", "F"];
    const seatsPerRow = 8;
    const layout: Seat[] = [];

    rows.forEach((row) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        // Randomly mark some seats as booked and some as premium
        const isBooked = Math.random() < 0.2; // 20% chance of being booked
        const isPremium = row === "A" || row === "B"; // First two rows are premium
        layout.push({
          row,
          number: i,
          isBooked,
          type: isPremium ? "premium" : "standard",
        });
      }
    });

    setSeatLayout(layout);
  };

  const toggleSeat = (seatId: string, isBooked: boolean) => {
    if (isBooked) return;

    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      } else {
        // Limit selection to 8 seats per booking
        if (prev.length >= 8) {
          setError("Maximum 8 seats per booking");
          return prev;
        }
        setError("");
        return [...prev, seatId];
      }
    });
  };

  const getSeatColor = (seat: Seat, isSelected: boolean) => {
    if (seat.isBooked) return "bg-red-500 cursor-not-allowed";
    if (isSelected) return "bg-green-500 hover:bg-green-600";
    if (seat.type === "premium") return "bg-purple-500 hover:bg-purple-600";
    return "bg-blue-500 hover:bg-blue-600";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedShowtime) {
      setError("Please select a showtime");
      return;
    }

    if (selectedSeats.length === 0) {
      setError("Please select at least one seat");
      return;
    }

    if (!customerName || !customerEmail || !customerPhone) {
      setError("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const bookingData: BookingData = {
        movieId: movie._id,
        showtime: selectedShowtime,
        seats: selectedSeats.length,
        totalPrice,
        customerName,
        customerEmail,
        customerPhone,
        selectedSeats: selectedSeats,
        movieTitle: movie.title, // Add movie title for email
      };

      const booking = await api.createBooking(bookingData);
      onSuccess(booking._id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Book Tickets</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 pb-6 border-b">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {movie.title}
            </h3>
            <p className="text-sm text-gray-600">
              {movie.genre} • {movie.language} • {movie.duration} min
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Clock className="w-4 h-4" />
                Select Showtime
              </label>
              <div className="grid grid-cols-3 gap-3">
                {movie.showtimes.map((showtime, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedShowtime(showtime.time)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedShowtime === showtime.time
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    <div className="font-semibold">{showtime.time}</div>
                    <div className="text-xs mt-1">
                      {showtime.availableSeats} seats available
                    </div>
                    <div className="text-sm font-bold mt-1">
                      ₹{showtime.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {selectedShowtime && (
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
                  <Users className="w-4 h-4" />
                  Select Seats ({selectedSeats.length} selected)
                </label>

                {fetchingSeats ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading seat layout...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Screen */}
                    <div className="text-center">
                      <div className="bg-gray-800 text-white py-2 mx-auto max-w-md rounded-t-lg">
                        <span className="font-semibold">SCREEN</span>
                      </div>
                      <div className="h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto max-w-md"></div>
                    </div>

                    {/* Seat Layout */}
                    <div className="space-y-3">
                      {["A", "B", "C", "D", "E", "F"].map((row) => (
                        <div
                          key={row}
                          className="flex items-center justify-center gap-2"
                        >
                          <span className="w-6 text-sm font-semibold text-gray-600">
                            {row}
                          </span>
                          <div className="flex gap-2">
                            {seatLayout
                              .filter((seat) => seat.row === row)
                              .map((seat) => {
                                const seatId = `${seat.row}${seat.number}`;
                                const isSelected =
                                  selectedSeats.includes(seatId);
                                return (
                                  <button
                                    key={seatId}
                                    type="button"
                                    onClick={() =>
                                      toggleSeat(seatId, seat.isBooked)
                                    }
                                    disabled={seat.isBooked}
                                    className={`w-8 h-8 rounded transition-all transform hover:scale-110 ${getSeatColor(
                                      seat,
                                      isSelected
                                    )} text-white text-xs font-bold ${
                                      seat.isBooked ? "" : "hover:shadow-lg"
                                    } ${
                                      isSelected
                                        ? "scale-110 ring-2 ring-green-300"
                                        : ""
                                    }`}
                                    title={`${seat.row}${seat.number} - ${
                                      seat.type
                                    } ${seat.isBooked ? "(Booked)" : ""}`}
                                  >
                                    {seat.number}
                                  </button>
                                );
                              })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Seat Legend */}
                    <div className="flex justify-center gap-6 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span>Standard (₹{standardPrice})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-purple-500 rounded"></div>
                        <span>Premium (₹{premiumPrice})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span>Booked</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span>Selected</span>
                      </div>
                    </div>

                    {/* Selected Seats Summary */}
                    {selectedSeats.length > 0 && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">
                          Selected Seats:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSeats.map((seatId) => {
                            const seat = seatLayout.find(
                              (s) => `${s.row}${s.number}` === seatId
                            );
                            return (
                              <span
                                key={seatId}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {seatId} ({seat?.type})
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between text-lg font-bold">
                <span className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Total Amount
                </span>
                <span className="text-blue-600">₹{totalPrice.toFixed(2)}</span>
              </div>
              {selectedSeats.length > 0 && (
                <div className="text-sm text-gray-600 mt-2">
                  {selectedSeats.length} seat
                  {selectedSeats.length > 1 ? "s" : ""} selected
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-700">
                Customer Details
              </h4>

              <input
                type="text"
                placeholder="Full Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  loading || !selectedShowtime || selectedSeats.length === 0
                }
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {loading
                  ? "Processing..."
                  : `Book ${selectedSeats.length} Seat${
                      selectedSeats.length !== 1 ? "s" : ""
                    }`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
