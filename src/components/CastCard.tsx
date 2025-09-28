"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

export function CastCard({ actor }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <motion.div className="group relative transition-all duration-300 ease-out gap-x-2 border border-neutral-600 rounded-lg">
      {/* Movie Poster Container with Border */}
      <motion.div
        className="relative w-full h-full overflow-hidden rounded-lg"
        initial={{ filter: "brightness(1) blur(0px)" }}
        whileHover={{ filter: "brightness(0.30) blur(8px)" }}
        transition={{ ease: "easeOut", duration: 0.3 }}
      >
        <Image
          src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
          alt={actor.title || "Actor Image"}
          width={300}
          height={450}
          className="object-cover transition-all duration-300 ease-out rounded-lg"
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
        )}
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
        <div className="text-center text-white tracking-tight z-10 px-4">
          <h3 className="text-md font-bold ">{actor.name}</h3>
          {actor.character && (
            <>
              <p className="text-xs">as</p>
              <p className="text-sm opacity-90"> {actor.character}</p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
