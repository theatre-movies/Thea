"use client";

import React, { useEffect, useState } from "react";
import MoviesSection from "@/components/MoviesSection";
import getNowPlayingMovies from "./hooks/getNowPlayingMovies";
import getPopularMovies from "./hooks/getPopularMovies";
import getTopRatedMovies from "./hooks/getTopRatedMovies";
import { CirclePlay, Flag, LibraryBig, TrendingUp } from "lucide-react";
import getTrendingMovies from "./hooks/getTrendingMovies";
import HeroSection from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { PageLoadingSkeleton } from "@/lib/Skeleton";
import getTrendingIndianMovies from "./hooks/getTrendingIndianMovies";

const Home = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<
    TMDBMoviesResponse | undefined
  >();
  const [popularMovies, setPopularMovies] = useState<
    TMDBMoviesResponse | undefined
  >();
  const [topRatedMovies, setTopRatedMovies] = useState<
    TMDBMoviesResponse | undefined
  >();
  const [trendingMovies, setTrendingMovies] = useState<
    MediaResponse | undefined
  >();
  const [trendingIndianMovies, setTrendingIndianMovies] = useState<
    TMDBMoviesResponse | undefined
  >();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const [nowPlaying, popular, topRated, trending, trendingIndian] =
          await Promise.all([
            getNowPlayingMovies(),
            getPopularMovies(),
            getTopRatedMovies(),
            getTrendingMovies(),
            getTrendingIndianMovies(),
          ]);

        setNowPlayingMovies(nowPlaying);
        setPopularMovies(popular);
        setTopRatedMovies(topRated);
        setTrendingMovies(trending);
        setTrendingIndianMovies(trendingIndian);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return <PageLoadingSkeleton />;
  }

  return (
    <div className="relative space-y-12">
      <Navbar />
      <div className="w-full mt-12 ">
        <HeroSection movies={trendingMovies} />
      </div>
      {!loading && (
        <div className="sm:mx-20">
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
          <MoviesSection
            movies={trendingIndianMovies}
            title={"Trending Indian Movies"}
            logo={<Flag className="text-neutral-200 size-8 " />}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
