// ============================================
// SERVER ACTION: actions/searchMedia.ts
// ============================================
"use server";

import axios from "axios";
import { token } from "../lib/token";

interface SearchParams {
  query: string;
  page?: number;
}

export async function getsearchMedia({ query, page = 1 }: SearchParams) {
  if (!query.trim()) {
    return { results: [], total_pages: 0, total_results: 0 };
  }

  try {
    const header = `Bearer ${token}`;
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?query=${query}`,
      {
        headers: {
          Authorization: header,
        },
        params: {
          query: query,
          page: page,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error searching media:", error);
    throw new Error("Failed to search media");
  }
}
