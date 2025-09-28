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
import { CastCard } from "./CastCard";

const MovieCastSection = ({
  actors,
  title,
}: {
  title: string;
  actors: any;
}) => {
  const router = useRouter();
  return (
    <>
      <h1 className="text-2xl font-bold text-neutral-300 flex justify-start pl-4 tracking-tight">
        {title}
      </h1>
      <Carousel>
        <CarouselContent className="p-4">
          {actors?.cast?.map((actor: any, index: number) => (
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
