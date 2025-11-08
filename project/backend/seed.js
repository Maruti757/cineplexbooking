import mongoose from "mongoose";
import dotenv from "dotenv";
import Movie from "./models/Movie.js";

dotenv.config();

const sampleMovies = [
  {
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genre: "Sci-Fi",
    duration: "2hr:46min",
    language: "English",
    rating: 8.8,
    releaseDate: new Date("2010-07-16"),
    posterUrl:
      "https://images.moviesanywhere.com/828288e8eff24b4e7851f6404ec98b67/ed5440ea-03ce-4038-8538-10845b0c7d82.jpg",
    showtimes: [
      { time: "10:00 AM", price: 250 },
      { time: "01:30 PM", price: 300 },
      { time: "06:00 PM", price: 350 },
      { time: "09:30 PM", price: 300 },
    ],
  },
  {
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    genre: "Action",
    duration: "2hr:53min",
    language: "English",
    rating: 9.0,
    releaseDate: new Date("2008-07-18"),
    posterUrl:
      "https://m.media-amazon.com/images/S/pv-target-images/8753733ac616155963cc440c3cf5367f45d7685b672c5b9c35bc7f182aec17c4.jpg",
    showtimes: [
      { time: "11:00 AM", price: 250 },
      { time: "02:30 PM", price: 300 },
      { time: "06:30 PM", price: 350 },
      { time: "10:00 PM", price: 300 },
    ],
  },
  {
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre: "Sci-Fi",
    duration: "3hr:21min",
    language: "English",
    rating: 8.6,
    releaseDate: new Date("2014-11-07"),
    posterUrl:
      "https://m.media-amazon.com/images/I/81pbgU7wG-L._AC_UF1000,1000_QL80_.jpg",
    showtimes: [
      { time: "10:30 AM", price: 250 },
      { time: "02:00 PM", price: 300 },
      { time: "05:30 PM", price: 350 },
      { time: "09:00 PM", price: 300 },
    ],
  },
  {
    title: "Parasite",
    description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    genre: "Thriller",
    duration: "2hr:22min",
    language: "Korean",
    rating: 8.6,
    releaseDate: new Date("2019-05-30"),
    posterUrl:
      "https://images.moviesanywhere.com/76cd3a853ffede1f5983f090839cacc8/8ca75d25-0bc2-4584-9d4c-3a381232c870.jpg",
    showtimes: [
      { time: "11:30 AM", price: 200 },
      { time: "03:00 PM", price: 250 },
      { time: "07:00 PM", price: 300 },
      { time: "10:30 PM", price: 250 },
    ],
  },
  {
    title: "Avengers: Endgame",
    description:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.",
    genre: "Action",
    duration: "3hr:01min",
    language: "English",
    rating: 8.4,
    releaseDate: new Date("2019-04-26"),
    posterUrl:
      "https://images.moviesanywhere.com/4677177f6f0595289bc3e767e7b47459/1d6c6c73-ab1e-4453-969c-6a4e965ebb37.jpg",
    showtimes: [
      { time: "09:00 AM", price: 300 },
      { time: "12:30 PM", price: 350 },
      { time: "04:00 PM", price: 400 },
      { time: "08:00 PM", price: 400 },
    ],
  },
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genre: "Drama",
    duration: "2hr:22min",
    language: "English",
    rating: 9.3,
    releaseDate: new Date("1994-09-23"),
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    showtimes: [
      { time: "10:00 AM", price: 200 },
      { time: "01:00 PM", price: 250 },
      { time: "05:00 PM", price: 300 },
      { time: "08:30 PM", price: 250 },
    ],
  },
  {
    title: "Kantara -A Legend(ಕಾಂತಾರ)",
    description:
      "During the Kadamba reign, fictional feudatory land Bangra’s ruler King Vijayendra, on his venture to kantara meets his final fate in the mystical forest. On witnessing this, his son Rajashekara seals the borders. Later Prince Kulashekara reopens by massacring them. Protagonist Berme, seeking prosperity, crosses the divide & sparks a clash of faith, power,",
    genre: "Action",
    duration: "2hr:59min",
    language: "ಕನ್ನಡ(Kannada)",
    rating: 8.4,
    releaseDate: new Date("2025-10-2"),
    posterUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyNtQ_bFXIC83-dgByWXV5yZVJVDKgNXM8M1FF7FeVUF5sgdX3xv1zieGHKdPiGplSIhaazw&s=10",
    showtimes: [
      { time: "09:00 AM", price: 300 },
      { time: "12:30 PM", price: 350 },
      { time: "04:00 PM", price: 400 },
      { time: "08:00 PM", price: 400 },
    ],
  },
  {
    title: "Kaatera (ಕಾಟೇರ)",
    description:
      "Kaatera is a 2023 Indian Kannada-language action drama film co-written and directed by Tharun Sudhir and produced by Rockline Venkatesh. The film is inspired by a real-life incident at a village in Karnataka in the 1970s.",
    genre: "Action",
    duration: "2hr:59min",
    language: "ಕನ್ನಡ(Kannada)",
    rating: 8.4,
    releaseDate: new Date("2019-04-26"),
    posterUrl:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kaatera-et00355776-1680501742.jpg",
    showtimes: [
      { time: "09:00 AM", price: 300 },
      { time: "12:30 PM", price: 350 },
      { time: "04:00 PM", price: 400 },
      { time: "08:00 PM", price: 400 },
    ],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Movie.deleteMany({});
    console.log("Cleared existing movies");

    await Movie.insertMany(sampleMovies);
    console.log("Sample movies added successfully");

    console.log(
      `${sampleMovies.length} movies have been seeded to the database`
    );
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
