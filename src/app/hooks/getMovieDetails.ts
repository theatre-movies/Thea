"use server";

import axios from "axios";
import { token } from "../lib/token";

export default async function getMovieDetails({ id }: { id: string }) {
  const header = `Bearer ${token}`;
  const movies = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: header,
    },
  });

  const result = movies.data;

  return result;
}
