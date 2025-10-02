"use server";

import axios from "axios";
import { token } from "../lib/token";

export default async function getTrendingMovies() {
  const header = `Bearer ${token}`;

  const movies = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day
`,
    {
      headers: {
        Authorization: header,
      },
    }
  );

  const result = movies.data;

  return result;
}
