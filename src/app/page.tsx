"use client";

import React, { useEffect, useState } from "react";
import MoviesSection from "@/components/MoviesSection";
import getNowPlayingMovies from "./hooks/getNowPlayingMovies";
import getPopularMovies from "./hooks/getPopularMovies";
import getTopRatedMovies from "./hooks/getTopRatedMovies";
import { motion } from "motion/react";
import { CirclePlay, LibraryBig, Loader2, TrendingUp } from "lucide-react";
import getTrendingMovies from "./hooks/getTrendingMovies";
import HeroSection from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";

const Home = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState(null);
  const [popularMovies, setPopularMovies] = useState(null);
  const [topRatedMovies, setTopRatedMovies] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const [nowPlaying, popular, topRated, trending] = await Promise.all([
          getNowPlayingMovies(),
          getPopularMovies(),
          getTopRatedMovies(),
          getTrendingMovies(),
        ]);

        setNowPlayingMovies(nowPlaying);
        setPopularMovies(popular);
        setTopRatedMovies(topRated);
        setTrendingMovies(trending);
        console.log(trending);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  return (
    <div className="relative space-y-12">
      <Navbar />
      <div className="w-full mt-12 ">
        <HeroSection movies={trendingMovies} />
      </div>

      <div className="mx-20">
        <MoviesSection
          movies={nowPlayingMovies}
          title={"Now Playing"}
          logo={<CirclePlay className="text-neutral-200 size-8 " />}
        />
        <MoviesSection
          movies={topRatedMovies}
          title={"Top Rated"}
          logo={<LibraryBig className="text-neutral-200 size-8 " />}
        />
        <MoviesSection
          movies={popularMovies}
          title={"Popular Movies"}
          logo={<TrendingUp className="text-neutral-200 size-8 " />}
        />
      </div>
    </div>
  );
};

export default Home;
