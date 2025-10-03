"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Info, Star, Film, Tv } from "lucide-react";
import { easeInOut, motion } from "framer-motion";

export function HeroMovieCard({
  movie,
  className = "",
  sequence,
}: {
  movie: MediaItem;
  className?: string;
  sequence?: number;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const movieYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : undefined;

  const showYear = movie?.first_air_date
    ? new Date(movie?.first_air_date).getFullYear()
    : undefined;
  const rating =
    typeof movie.vote_average === "number"
      ? Math.round(movie.vote_average * 10) / 10
      : undefined;

  // Construct the full image URL
  const getImageUrl = (path?: string) => {
    if (!path) return "/placeholder.svg";

    // If it's already a full URL, return as is
    if (path.startsWith("http")) return path;

    // Construct TMDB image URL
    return `https://image.tmdb.org/t/p/original${path}`;
  };

  const imageSrc = getImageUrl(
    movie?.backdrop_path ?? movie?.poster_path ?? undefined
  );

  console.log("Image source:", imageSrc);

  return (
    <Link href={`/movie/${movie.id}`} className="block">
      <div
        className={`relative transition-all duration-300 ease-out ${className}`}
      >
        <div className="relative overflow-hidden rounded-xl bg-neutral-900">
          {/* Background image */}
          <div className="relative w-full h-[520px] md:h-[620px] lg:h-[680px]">
            {!imageError ? (
              <motion.div
                key={sequence}
                initial={{ opacity: 0.8, scale: 1.3 }} // Start slightly scaled up
                animate={{ opacity: 1, scale: 1 }} // Animate to full opacity and normal scale
                transition={{
                  duration: (sequence ?? 1) * 1,
                  delay: (sequence ?? 1) * 1,
                  ease: "easeInOut",
                }} // Use string-based easing
                className="absolute inset-0 "
              >
                <Image
                  src={imageSrc}
                  alt={movie.title || "Feature background"}
                  fill
                  priority
                  unoptimized
                  className={`object-cover sm:object-center transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    console.error("Image failed to load:", imageSrc);
                    setImageError(true);
                  }}
                  sizes="100vw"
                />
              </motion.div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
                <div className="text-center text-neutral-400">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-lg">{movie.title}</p>
                </div>
              </div>
            )}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
            )}
          </div>

          {/* Gradient overlay for readability */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-10">
            <div className="max-w-3xl space-y-3 md:space-y-4">
              <h2 className="text-xl md:text-5xl font-bold text-white tracking-tight">
                {movie.title || movie?.name}
              </h2>
              <div className="flex items-center gap-3 text-white/90">
                {typeof rating === "number" && (
                  <Badge className="bg-black/60 text-white h-6 gap-1 px-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className=" text-xs sm:text-sm font-[550]">
                      {rating}
                    </span>
                  </Badge>
                )}
                {movieYear && (
                  <span className="text-xs sm:text-sm font-[550]">
                    {movieYear}
                  </span>
                )}
                {showYear && (
                  <span className="text-xs sm:text-sm font-[550]">
                    {showYear}
                  </span>
                )}

                {movie?.media_type === "movie" && (
                  <div className="flex gap-x-2 items-center bg-black/60 sm:p-2 p-1 rounded-md border border-neutral-700 ">
                    <Film className="size-4   text-neutral-100 z-10" />
                    <span className="z-50 text-neutral-200 text-xs tracking-tight font-bold ">
                      Movie
                    </span>
                  </div>
                )}
                {movie?.media_type === "tv" && (
                  <div className="flex gap-x-2 items-center bg-black/60 sm:p-2 p-1 rounded-md border border-neutral-700 ">
                    <Tv className="size-4  text-neutral-100 z-10" />
                    <span className="z-50 text-neutral-200 text-xs tracking-tight font-bold ">
                      Tv Show
                    </span>
                  </div>
                )}
              </div>

              {movie.overview && (
                <p className="text-neutral-300 tracking-tight sm:text-pretty text-xs sm:text-lg">
                  {movie.overview}
                </p>
              )}

              <div className="flex items-center gap-3 pt-1">
                <Button
                  className="rounded-md bg-indigo-600 text-white hover:bg-indigo-500"
                  size="lg"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `/movie/watch/${movie.id}`;
                  }}
                >
                  <Play className="mr-2 h-5 w-5 fill-current" />
                  Watch Now
                </Button>
                <Button
                  variant="secondary"
                  className="rounded-md bg-white/15 hover:bg-white/25 text-white backdrop-blur"
                  size="lg"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `/movie/${movie.id}`;
                  }}
                >
                  <Info className="mr-2 h-5 w-5" />
                  More Info
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
