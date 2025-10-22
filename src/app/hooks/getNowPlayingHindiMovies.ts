"use server";

import axios from "axios";
import { token } from "../../lib/token";

export default async function getNowPlayingHindiMovies() {
  const header = `Bearer ${token}`;

  const movies = await axios.get(
    "https://api.themoviedb.org/3/discover/movie",
    {
      headers: {
        Authorization: header,
      },
      params: {
        with_original_language: "hi", // Hindi language
        "primary_release_date.gte": new Date(
          Date.now() - 90 * 24 * 60 * 60 * 1000
        )
          .toISOString()
          .split("T")[0], // Last 90 days
        "primary_release_date.lte": new Date().toISOString().split("T")[0], // Today
        sort_by: "popularity.desc",
        page: 1,
      },
    }
  );

  const result = movies.data;
  return result;
}
