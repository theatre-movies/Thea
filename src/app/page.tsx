"use client";

import React, { useEffect, useState } from "react";
import MoviesSection from "@/components/MoviesSection";
import getNowPlayingMovies from "./hooks/getNowPlayingMovies";
import getPopularMovies from "./hooks/getPopularMovies";
import getTopRatedMovies from "./hooks/getTopRatedMovies";

const Home = () => {
  const [NowPlayingMovies, setNowPlayingMovies] = useState<any>(null);
  const [popularMovies, setPopularMovies] = useState<any>(null);
  const [topRatedMovies, setTopRatedMovies] = useState<any>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const nowPlayingMovies = await getNowPlayingMovies();
      setNowPlayingMovies(nowPlayingMovies);

      const popularMovies = await getPopularMovies();
      setPopularMovies(popularMovies);

      const topRatedMovies = await getTopRatedMovies();
      setTopRatedMovies(topRatedMovies);
    };
    fetchMovies();
  }, []);

  return (
    <div className="relative   mt-10">
      {/* Popular Movies */}

      <div className="mx-20">
        <MoviesSection movies={NowPlayingMovies} title={"Now Playing"} />
        <MoviesSection movies={topRatedMovies} title={"Top Rated"} />
        <MoviesSection movies={popularMovies} title={"Popular Movies"} />
      </div>

    </div>
  );
};

export default Home;
