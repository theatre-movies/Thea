"use client";

import getMovieCast from "@/app/hooks/getMovieCast";
import getMovieDetails from "@/app/hooks/getMovieDetails";
import getMovieImages from "@/app/hooks/getMovieImages";
import getMovieProviders from "@/app/hooks/getMovieProviders";
import getMovieVideos from "@/app/hooks/getMovieVideos";
import getRecommendedMovies from "@/app/hooks/getRecommendeMovies";
import getSImilarMovies from "@/app/hooks/getSimilarMovies";
import MovieCastSection from "@/components/MovieCastSection";
import MovieImages from "@/components/MovieImages";
import { MovieProviders } from "@/components/MovieProviders";
import MoviesSection from "@/components/MoviesSection";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import VideosAndTrailersSection from "@/components/VIdeosAndTrailersSection";
import { MovieDetailSkeleton } from "@/lib/Skeleton";
import { Calendar, Clock, Play, Puzzle, Star, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const params = useParams();
  const id = params.id;
  const [movieDetails, setMovieDetails] = useState<MovieDetails | undefined>();
  const [cast, setCast] = useState<MovieCredits | undefined>();
  const [images, setImages] = useState<Media | undefined>();
  const [videos, setVideos] = useState(null);
  const [providers, setProviders] = useState<
    MovieProvidersResponse | undefined
  >();
  const [similarMovies, setSimilarMovies] = useState<
    TMDBMoviesResponse | undefined
  >();
  const [recommendedMovies, setRecommendedMovies] = useState<
    TMDBMoviesResponse | undefined
  >();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        // Fixed: Fetch movie details once
        const movieDetails = await getMovieDetails({ id: id as string });
        setMovieDetails(movieDetails);

        // Fixed: Fetch images using correct hook
        const fetchImages = await getMovieImages({ id: id as string });
        setImages(fetchImages);

        // Fixed: Fetch cast using correct hook
        const getCast = await getMovieCast({ id: id as string });
        setCast(getCast);

        // Fixed: Use separate hooks for providers and videos
        const fetchMovieProviders = await getMovieProviders({
          id: id as string,
        });
        setProviders(fetchMovieProviders);

        const fetchMovieVideos = await getMovieVideos({ id: id as string });
        setVideos(fetchMovieVideos);

        // Fixed: Fetch similar movies
        const getSimilarMovies = await getSImilarMovies({ id: id as string });
        setSimilarMovies(getSimilarMovies);

        const fetchRecommendedMovies = await getRecommendedMovies({
          id: id as string,
        });
        setRecommendedMovies(fetchRecommendedMovies);

        console.log(topLogo);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  // Loading state
  if (!movieDetails || loading || !videos) {
    return <MovieDetailSkeleton />;
  }

  const topLogo =
    images?.logos && images?.logos?.length > 0
      ? [...images.logos]
          .filter((logo) => logo.iso_639_1 === "en")
          .sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0))[0]
      : null;

  return (
    <div className="relative min-h-screen bg-black">
      <Navbar />
      {/* 

      {/* Background Images - Hero Section Only */}
      <div className="absolute inset-x-0 -top-4 z-0">
        <MovieImages images={images} />
      </div>
      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[25%_75%] gap-8 mx-4 lg:mx-10 pt-20 lg:pt-96 ">
          {/* Movie Poster */}
          <div className="flex flex-col justify-center lg:justify-start space-y-4  pb-8 border-b-2 rounded-md sm:border-0 sm:pb-0 sm:rounded-none border-neutral-300">
            {movieDetails?.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
                width={320}
                height={450}
                alt={"Movie Poster"}
                className="rounded-lg border border-neutral-700 sm:mx-0 mx-9  "
                onError={(e) => {
                  console.error("Failed to load poster");
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
            {/* <Button
              variant={"default"}
              className="h-10 w-[90%] flex justify-center sm:mx-0 mx-4 "
            >
              <Video className="size-5" />
              <p>Watch Trailer</p>
            </Button> */}
            <Link href={`/movie/watch/${id}`}>
              <Button
                variant={"secondary"}
                className="h-10 w-[90%] sm:mx-0 mx-4"
              >
                <Play className="size-5" />
                <p>Watch Now</p>
              </Button>
            </Link>
          </div>

          {/* Movie Details */}
          <div className="space-y-4 flex flex-col justify-start text-neutral-400">
            {/* Movie Logo */}

            {images?.logos?.[0]?.file_path && (
              <Image
                src={`https://image.tmdb.org/t/p/original/${topLogo?.file_path}`}
                width={130}
                height={130}
                alt={"Movie Logo"}
                className="rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}

            {/* Tagline */}
            {movieDetails.tagline && (
              <h1 className="text-xl tracking-tight italic py-2 text-neutral-300">
                {"'"}
                {movieDetails.tagline}
                {'"'}
              </h1>
            )}

            {/* Movie Stats */}
            <div className="flex flex-wrap gap-4 font-light">
              {movieDetails.release_date && (
                <div className="flex gap-1 items-center">
                  <Calendar className="size-4" />
                  <p>{new Date(movieDetails.release_date).getFullYear()}</p>
                </div>
              )}

              {movieDetails.runtime && (
                <div className="flex gap-1 items-center">
                  <Clock className="size-4" />
                  <p>
                    {Math.floor(movieDetails.runtime / 60)}h{" "}
                    {movieDetails.runtime % 60}m
                  </p>
                </div>
              )}

              {movieDetails.vote_average && (
                <div className="flex gap-1 items-center">
                  <Star className="size-4 fill-yellow-500 stroke-none" />
                  <p>{Math.round(movieDetails.vote_average * 10) / 10}</p>
                </div>
              )}
            </div>

            {/* Genres */}
            {movieDetails.genres && movieDetails.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movieDetails.genres.map((genre: Genre) => (
                  <span
                    key={genre.id}
                    className="text-sm border px-2 py-1 rounded-md text-neutral-400 border-neutral-600 bg-neutral-800/50"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            {movieDetails.overview && (
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-neutral-200">
                  Overview
                </h2>
                <p className="text-neutral-400 leading-6 max-w-4xl">
                  {movieDetails.overview}
                </p>
              </div>
            )}

            {/* Where to Watch */}
            <MovieProviders providers={providers} />
          </div>
        </div>

        {/* Cast and Videos Sections */}
        <div className="relative z-20 mx-4 lg:mx-10 pt-8 space-y-8">
          {/* Cast Section */}
          {cast && (
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6">
              <MovieCastSection actors={cast} title={"Cast"} />
            </div>
          )}

          {/* Videos Section */}
          {videos && (
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6">
              <VideosAndTrailersSection
                movies={videos}
                title={"Videos & Trailers"}
              />
            </div>
          )}

          {/* Similar Movies Section */}
          {similarMovies?.total_results !== undefined &&
            similarMovies.total_results > 0 && (
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 mb-8">
                <MoviesSection
                  movies={similarMovies}
                  title={"Similar Movies"}
                  logo={
                    <Puzzle className="sm:size-5 size-4 text-neutral-200 " />
                  }
                />
              </div>
            )}

          {/* Recommendation Movies section */}
          {recommendedMovies?.total_results !== undefined &&
            recommendedMovies?.total_results > 0 && (
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 mb-8">
                <MoviesSection
                  movies={recommendedMovies}
                  title={"Recommended Movies"}
                  logo={<Star className="size-5 text-neutral-200 " />}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Page;
