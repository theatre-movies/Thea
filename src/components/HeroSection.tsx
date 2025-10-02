"use client";

import type React from "react";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HeroMovieCard } from "./HeroMovieCard";
import { useEffect, useState } from "react";

export default function HeroSection({ movies }: { movies: any }) {
  const list = Array.isArray(movies) ? movies : movies?.results ?? [];
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      className="w-full "
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
    >
      <CarouselContent className="p-10">
        {list.map((movie, index: number) => (
          <CarouselItem key={movie.id} className="basis-full">
            <HeroMovieCard movie={movie} sequence={index} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="pl-20">
        <CarouselPrevious />
      </div>
      <div className="mr-20">
        <CarouselNext />
      </div>
    </Carousel>
  );
}
