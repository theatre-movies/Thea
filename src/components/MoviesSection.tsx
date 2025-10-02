"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MovieCard } from "./MovieCard";

const MoviesSection = ({
  movies,
  title,
  logo,
}: {
  movies?: TMDBMoviesResponse;
  title?: string;
  logo?: React.ReactNode;
}) => {
  return (
    <>
      {title && (
        <div className="flex pl-4 -mb-4 items-center gap-2">
          {logo && (
            <div className="flex items-center gap-2">
              <span className="">{logo}</span>
              <div className="w-2 h-2 animate-pulse bg-neutral-200 rounded-full"></div>
            </div>
          )}
          <h1 className="text-2xl font-bold text-neutral-200 flex justify-start tracking-tight ">
            {title}
          </h1>
        </div>
      )}
      <Carousel>
        <CarouselContent className="p-4">
          {movies?.results?.map((movie: TMDBMovie, index: number) => (
            <CarouselItem key={index} className=" md:basis-1/3 lg:basis-2/13">
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="ml-10">
          <CarouselPrevious />
        </div>
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default MoviesSection;
