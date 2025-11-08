import { CheckCircle, X } from 'lucide-react';

interface BookingConfirmationProps {
  bookingId: string;
  onClose: () => void;
}

export default function BookingConfirmation({ bookingId, onClose }: BookingConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h2>

        <p className="text-gray-600 mb-6">
          Your booking has been successfully confirmed. We've sent the details to your email.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">Booking ID</p>
          <p className="text-lg font-mono font-bold text-gray-800">{bookingId}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}
