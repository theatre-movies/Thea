"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Star, Info } from "lucide-react";
import Link from "next/link";

interface MovieCardProps {
  movie: TMDBMovie;
  className?: string;
}

export function MovieCard({ movie, className = "" }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;
  const rating = movie.vote_average
    ? Math.round(movie.vote_average * 10) / 10
    : null;

  return (
    <div
      className={`group relative transition-all duration-300 ease-out ${className} GAP-X-2`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={`
        relative overflow-hidden border-0 bg-transparent transition-all duration-300 ease-out
        ${isHovered ? "scale-110 z-50" : "scale-100 z-10"}
      `}
      >
        <CardContent className="p-0 relative aspect-[2/3]">
          {/* Movie Poster */}
          <div className="relative w-full h-full overflow-hidden rounded-lg">
            <Link href={`/movie/${movie?.id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                fill
                className={`
                object-cover transition-all duration-300 ease-out
                ${imageLoaded ? "opacity-100" : "opacity-0"}
                ${isHovered ? "brightness-75" : "brightness-100"}
              `}
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </Link>

            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
            )}
          </div>

          {/* Hover Overlay */}
          <Link href={`/movie/${movie?.id}`}>
            <div
              className={`
            absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
            transition-opacity duration-300 ease-out
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
            >
              {/* Action Buttons */}
              <div className="absolute bottom-4 left-4 right-4 space-y-3">
                {/* Play and Action Buttons */}

                {/* Movie Info */}
                <div className="space-y-1">
                  <h3 className="text-white font-[550] tracking-tight text-md text-wrap">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    {rating && (
                      <Badge
                        variant="secondary"
                        className="bg-black text-white text-xs px-1.5 py-0.5 h-auto flex items-center"
                      >
                        <Star className="inline-block w-3 h-3 mr-1 fill-yellow-600 stroke-none" />{" "}
                        {rating}
                      </Badge>
                    )}
                    {year && <span>{year}</span>}
                  </div>
                  {movie.overview && (
                    <p className="text-white/70 text-xs line-clamp-3 tracking-tight leading-relaxed">
                      {movie.overview}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/movie/watch/${movie?.id}`}>
                    <Button
                      size="sm"
                      className="bg-white text-black hover:bg-white/90 rounded-full p-2 h-8 w-8"
                    >
                      <Play className="h-3 w-3 fill-current" />
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    className=" text-white  rounded-full p-2 h-8 w-8 bg-transparent"
                  >
                    <Info className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
