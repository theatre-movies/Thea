"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import { YoutubeIcon } from "lucide-react";

interface VideosAndTrailersSectionProps {
  movies: MovieVideos;
  title?: string;
}
const VideosAndTrailersSection = ({
  movies,
  title,
}: VideosAndTrailersSectionProps) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center gap-2 pl-4">
        <YoutubeIcon className="size-10 fill-red-600 stroke-black" />
        <div className="w-2 h-2 animate-pulse bg-neutral-200 rounded-full"></div>

        <h1 className="text-2xl font-bold text-neutral-300 flex justify-start  tracking-tight">
          {title}
        </h1>
      </div>
      <Carousel>
        <CarouselContent className="p-4">
          {movies?.results?.map((movie: Video, index: number) => (
            <CarouselItem
              key={index}
              className="md:basis-1/3 lg:basis-1/4"
              onClick={() => router.push(`/movie/${movie.id}`)}
            >
              <iframe
                className="w-full h-[250px] rounded-lg" // Increased width and height
                src={`https://www.youtube.com/embed/${movie.key}`}
                title="Robert De Niro Auditioning for Sonny Corleone in The Godfather"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
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

export default VideosAndTrailersSection;
