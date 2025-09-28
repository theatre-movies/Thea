import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const header = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDM3ZmI3YzFiZTU4YjIzMzI3NTFhMGNjZDJhM2RjZCIsIm5iZiI6MTcyNzc4MzYzMS41MjEsInN1YiI6IjY2ZmJlMmNmZTc4MTFlZjZjYmE2N2I1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OSZXPjBLGBufBTCtCq06AsPhPgJoxWxyAugdi3K94QU`;
  const movies = await axios.get(
    "https://api.themoviedb.org/3/movie/now_playing",
    {
      headers: {
        Authorization: header,
      },
    }
  );

  const result = movies.data;

  return NextResponse.json({ result }); // Example response
}
