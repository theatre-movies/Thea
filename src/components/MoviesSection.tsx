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
import { useRouter } from "next/navigation";

const MoviesSection = ({ movies, title }) => {
  const router = useRouter();
  return (
    <>
      {title && (
        <h1 className="text-2xl font-bold text-neutral-300 flex justify-start pl-4 tracking-tight">
          {title}
        </h1>
      )}

      <Carousel>
        <CarouselContent className="p-4">
          {movies?.results?.map((movie: any, index: number) => (
            <CarouselItem
              key={index}
              className=" md:basis-1/3 lg:basis-2/13"
              onClick={() => router.push(`/movie/${movie.id}`)}
            >
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
