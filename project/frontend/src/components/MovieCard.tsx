import { Film, Clock, Star, Ticket } from "lucide-react";
import { Movie } from "../services/api";
import { useState } from "react";

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

export default function MovieCard({ movie, onSelect }: MovieCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => onSelect(movie)}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-100 flex flex-col h-full"
    >
      {/* Image Container with Fixed Height */}
      {/* Image Container with Aspect Ratio */}
<div className="relative aspect-[2/3] bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
  <img
    src={
      imgError
        ? `/api/placeholder/300/400?text=${encodeURIComponent(movie.title)}`
        : movie.posterUrl
    }
    alt={movie.title}
    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    onError={() => setImgError(true)}
  />


        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/80 text-white px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
          <Star className="w-4 h-4 fill-yellow-400" />
          <span className="font-bold">{movie.rating}</span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4">
          <Ticket className="w-6 h-6 text-white animate-bounce" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {movie.title}
        </h3>

        <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
            <Clock className="w-4 h-4" />
            <span>{movie.duration}m</span>
          </div>
          <div className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-full">
            <Film className="w-4 h-4" />
            <span>{movie.language}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed flex-grow">
          {movie.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {movie.genre}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(movie);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
