"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CastCard } from "./CastCard";
import { User } from "lucide-react";

const MovieCastSection = ({
  actors,
  title,
}: {
  title: string;
  actors: MovieCredits;
}) => {
  return (
    <>
      <div className="flex items-center gap-2 pl-4">
        <User className="size-8 fill-neutral-300 stroke-none " />
        <div className="w-2 h-2 animate-pulse bg-neutral-200 rounded-full"></div>
        <h1 className="text-2xl font-bold text-neutral-300 flex justify-start  tracking-tight">
          {title}
        </h1>
      </div>
      <Carousel>
        <CarouselContent className="p-4">
          {actors?.cast?.map((actor: CastMember, index: number) => (
            <CarouselItem key={index} className=" md:basis-1/3 lg:basis-2/13">
              <CastCard actor={actor} />
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

export default MovieCastSection;
