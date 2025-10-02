"use server";

import axios from "axios";
import { token } from "../../lib/token";

export default async function getRecommendedMovies({ id }: { id: string }) {
  const header = `Bearer ${token}`;
  const movies = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/recommendations`,
    {
      headers: {
        Authorization: header,
      },
    }
  );

  const result = movies.data;

  return result;
}
