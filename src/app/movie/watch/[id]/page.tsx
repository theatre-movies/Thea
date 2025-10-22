"use client";

import getMovieDetails from "@/app/hooks/getMovieDetails";
import getRecommendedMovies from "@/app/hooks/getRecommendeMovies";
import MoviesSection from "@/components/MoviesSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookHeart,
  File,
  MoveDiagonal,
  ReceiptText,
  ServerCog,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const sources = [
  {
    name: "VidKing (Recommended)",
    url: (id: string) =>
      `https://www.vidking.net/embed/movie/${id}?color=01855b`,
  },
  {
    name: "Cinemaos",
    url: (id: string) => `https://cinemaos.tech/player/${id}?color=01855b`,
  },
  {
    name: "VidFast",
    url: (id: string) => `https://vidfast.pro/movie/${id}?theme=9B59B6`,
  },
  {
    name: "Mapple",
    url: (id: string) => `https://mappletv.uk/watch/movie/${id}`,
  },
  {
    name: "SpencerDevs",
    url: (id: string) => `https://spencerdevs.xyz/movie/${id}`,
  },
];

const Page = () => {
  const params = useParams();
  const id = params.id as string;
  const [server, setServer] = useState(sources[0].url(id));
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | undefined>();
  const [recommendedMovies, setRecommendedMovies] = useState(null);

  // Handle iframe loading state
  const handleLoad = () => setLoading(false);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      const getmovieDetails = await getMovieDetails({ id: id as string });
      setMovieDetails(getmovieDetails);

      const fetchRecommendedMovies = await getRecommendedMovies({
        id: id as string,
      });
      setRecommendedMovies(fetchRecommendedMovies);
    };
    fetchMovieDetails();
  }, [server, id]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white px-4 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-12 space-y-8 sm:space-y-12 lg:space-y-16">
      <div className="relative w-full pt-[56.25%]">
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}
        <iframe
          src={server}
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg border border-neutral-900"
          allowFullScreen
          allow="encrypted-media"
          onLoad={handleLoad}
        ></iframe>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[25%_75%] gap-6 sm:gap-8 mx-0 sm:mx-2 lg:mx-4">
          {/* Movie Poster */}
          <div className="flex flex-col justify-center lg:justify-start space-y-4">
            <div className="flex flex-col border border-neutral-800 rounded-md overflow-hidden">
              {movieDetails?.poster_path && (
                <div className="relative w-full aspect-[2/3]">
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${movieDetails?.poster_path}`}
                    alt="Movie Poster"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
              )}
              <div className="px-4 font-[550] flex flex-col space-y-1 text-neutral-300">
                <h1 className="text-base sm:text-lg">{movieDetails?.title}</h1>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span>
                    {movieDetails?.release_date
                      ? new Date(movieDetails.release_date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : ""}
                  </span>
                  {movieDetails?.runtime && <span>•</span>}
                  <span>
                    {movieDetails?.runtime !== undefined
                      ? `${Math.floor(movieDetails.runtime / 60)}h ${
                          movieDetails.runtime % 60
                        }m`
                      : ""}
                  </span>
                </div>
                <div className="pb-4 flex flex-wrap gap-2">
                  {movieDetails?.genres?.map((genre: Genre) => (
                    <span
                      key={genre.id}
                      className="text-xs border px-2 py-1 rounded-full border-neutral-600 bg-neutral-800/50"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="border border-neutral-800 rounded-md w-full flex justify-center p-3">
              <h1 className="text-neutral-400 italic text-sm sm:text-base lg:text-lg text-center">
                {'"'}
                {movieDetails?.tagline}
                {'"'}
              </h1>
            </div>
          </div>

          <div className="w-full flex flex-col space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="border border-neutral-800 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ServerCog className="size-4 sm:size-5" />
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <h2 className="text-lg sm:text-xl font-[550] tracking-tight">
                    Streaming Servers
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
                  {sources.map((source, idx) => (
                    <Button
                      key={source.name}
                      onClick={() => {
                        setServer(source.url(id));
                        setActive(idx);
                      }}
                      variant={active === idx ? "secondary" : "default"}
                      className="text-xs sm:text-sm  "
                    >
                      {source.name}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="border border-neutral-800 rounded-md w-full p-3 sm:p-4 px-4 text-neutral-400">
                <div className="flex items-center gap-2 p-1">
                  <MoveDiagonal className="size-4 sm:size-5 mr-2 fill-neutral-200 stroke-none" />
                  <h2 className="text-lg sm:text-xl font-[550] tracking-tight mb-2 text-neutral-100">
                    Synopsis
                  </h2>
                </div>
                <p className="text-sm sm:text-base tracking-tight">
                  {movieDetails?.overview}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-10">
                {/* Details Section */}
                <div className="border border-neutral-800 p-4 sm:p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <ReceiptText className="size-4 sm:size-5" />
                    <h2 className="text-lg sm:text-xl font-[550] tracking-tight">
                      Details
                    </h2>
                  </div>
                  <div className="mt-4 space-y-2 text-neutral-300">
                    {movieDetails?.release_date && (
                      <div className="flex justify-between gap-2">
                        <span className="text-neutral-400 text-xs sm:text-sm">
                          Release Date
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-neutral-300 text-right">
                          {movieDetails?.release_date
                            ? new Date(
                                movieDetails.release_date
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : ""}
                        </span>
                      </div>
                    )}
                    {movieDetails?.runtime && (
                      <div className="flex justify-between gap-2">
                        <span className="text-neutral-400 text-xs sm:text-sm">
                          Runtime
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-neutral-300">
                          {movieDetails?.runtime ? (
                            <span>
                              {Math.floor(movieDetails?.runtime / 60)}h{" "}
                              {String(movieDetails?.runtime % 60).padStart(
                                2,
                                "0"
                              )}
                              m
                            </span>
                          ) : (
                            ""
                          )}
                        </span>
                      </div>
                    )}

                    {movieDetails?.original_language && (
                      <div className="flex justify-between gap-2">
                        <span className="text-neutral-400 text-xs sm:text-sm">
                          Language
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-neutral-300">
                          {movieDetails?.original_language?.toUpperCase() ||
                            "N/A"}
                        </span>
                      </div>
                    )}

                    {movieDetails?.status && (
                      <div className="flex justify-between gap-2">
                        <span className="text-neutral-400 text-xs sm:text-sm">
                          Status
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-neutral-300">
                          {movieDetails?.status || "N/A"}
                        </span>
                      </div>
                    )}

                    {movieDetails?.budget !== undefined &&
                      movieDetails.budget > 0 && (
                        <div className="flex justify-between gap-2">
                          <span className="text-neutral-400 text-xs sm:text-sm">
                            Budget
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-neutral-300 text-right">
                            {movieDetails?.budget
                              ? `$${movieDetails.budget.toLocaleString()}`
                              : "N/A"}
                          </span>
                        </div>
                      )}

                    {movieDetails?.revenue !== undefined &&
                      movieDetails?.revenue > 0 && (
                        <div className="flex justify-between gap-2">
                          <span className="text-neutral-400 text-xs sm:text-sm">
                            Revenue
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-neutral-300 text-right">
                            {movieDetails?.revenue
                              ? `$${movieDetails.revenue.toLocaleString()}`
                              : "N/A"}
                          </span>
                        </div>
                      )}
                  </div>
                </div>

                {/* Production Companies Section */}
                <div className="border border-neutral-800 p-4 sm:p-6 rounded-lg text-neutral-400">
                  <div className="flex items-center gap-2 mb-4">
                    <File className="size-4 sm:size-5 text-neutral-100" />
                    <h2 className="text-lg sm:text-xl font-[550] tracking-tight text-neutral-100">
                      Production Companies
                    </h2>
                  </div>
                  <div className="mt-4 space-y-3 sm:space-y-4 text-neutral-300">
                    <h1 className="text-neutral-400 text-xs sm:text-sm">
                      Companies
                    </h1>
                    <div className="flex flex-wrap gap-2">
                      {movieDetails?.production_companies &&
                        movieDetails?.production_companies.length > 0 &&
                        movieDetails?.production_companies.map(
                          (company: ProductionCompany) => (
                            <Badge
                              key={company.id}
                              className="text-xs font-bold text-neutral-200 px-3 py-1"
                            >
                              {company.name}
                            </Badge>
                          )
                        )}
                    </div>
                    <h1 className="pt-2 sm:pt-4 text-neutral-400 text-xs sm:text-sm">
                      Countries
                    </h1>
                    <div className="flex flex-wrap gap-2">
                      {movieDetails?.production_countries &&
                        movieDetails?.production_countries.length > 0 &&
                        movieDetails?.production_countries.map(
                          (country: ProductionCountry) => (
                            <Badge
                              key={country.iso_3166_1}
                              className="text-xs font-bold text-neutral-200 px-3 py-1"
                            >
                              {country.name}
                            </Badge>
                          )
                        )}
                    </div>

                    <h1 className="text-neutral-400 text-xs sm:text-sm">
                      Languages
                    </h1>
                    <div className="flex flex-wrap gap-2">
                      {movieDetails?.spoken_languages &&
                        movieDetails?.spoken_languages.length > 0 &&
                        movieDetails?.spoken_languages.map(
                          (language: SpokenLanguage, idx: number) => (
                            <Badge
                              key={language.iso_639_1}
                              className="text-xs font-bold text-neutral-200 px-3 py-1"
                            >
                              {language?.english_name}
                            </Badge>
                          )
                        )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendation Movies section */}
              {recommendedMovies && (
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-2 border border-neutral-800">
                  <div className="flex justify-start gap-2 px-4 items-center pt-4 sm:pt-6 lg:pt-8">
                    <BookHeart className="size-4 sm:size-5" />
                    <h2 className="text-lg sm:text-xl font-[550] tracking-tight text-neutral-100">
                      You may also like
                    </h2>
                  </div>
                  <div className="-mt-3">
                    <MoviesSection movies={recommendedMovies} title={""} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
