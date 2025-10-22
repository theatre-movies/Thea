"use server";

import axios from "axios";
import { token } from "../../lib/token";

export default async function getTrendingIndianMovies() {
  const header = `Bearer ${token}`;

  // Fetch trending movies and filter for Indian movies (original_language: 'hi', 'ta', 'te', 'ml', etc.)
  const movies = await axios.get(
    "https://api.themoviedb.org/3/discover/movie",
    {
      headers: {
        Authorization: header,
      },
      params: {
        with_origin_country: "IN", // Indian movies
        sort_by: "popularity.desc", // Sort by popularity
        "vote_count.gte": 100, // Minimum vote count for quality
        page: 1,
      },
    }
  );

  const result = movies.data;
  return result;
}
