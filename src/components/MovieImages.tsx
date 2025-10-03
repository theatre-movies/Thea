"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const MovieImages = ({ images }: { images: Media | undefined }) => {
  const backdrops = images?.backdrops || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-advance slideshow
  useEffect(() => {
    if (backdrops.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backdrops.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [backdrops.length]);

  // Preload images for smooth transitions
  useEffect(() => {
    if (backdrops.length === 0) return;

    backdrops.forEach((image) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = `https://image.tmdb.org/t/p/original${image.file_path}`;
    });
    setIsLoaded(true);
  }, [backdrops]);

  if (!isLoaded || backdrops.length === 0) {
    return <div className="fixed inset-0 bg-black animate-pulse" />;
  }

  // return (
  //   <div className="fixed inset-0 overflow-hidden">
  //     {backdrops.map((image: Image, index: number) => (
  //       <motion.div
  //         initial={{ opacity: 0, scale: 1 }}
  //         animate={{
  //           opacity: index === currentIndex ? 1 : 0,
  //           scale: index === currentIndex ? 1 : 0.93,
  //         }}
  //         transition={{ duration: 1.0 }}
  //         key={index}
  //         className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
  //           index === currentIndex ? "opacity-100" : "opacity-0"
  //         }`}
  //       >
  //         <Image
  //           src={`https://image.tmdb.org/t/p/original${image.file_path}`}
  //           alt={`Movie backdrop ${index + 1}`}
  //           className="w-full h-full object-cover"
  //           fill
  //           loading={index === 0 ? "eager" : "lazy"}
  //         />
  //         {/* Gradient overlay for better text readability */}
  //       </motion.div>
  //     ))}
  //     <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
  //   </div>
  // );
  // In MovieImages.tsx
  // In MovieImages.tsx
  return (
    <div className="absolute inset-x-0 top-0 h-[70vh] lg:h-[80vh] overflow-hidden">
      {backdrops.map((image: Image, index: number) => (
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            scale: index === currentIndex ? 1 : 0.93,
          }}
          transition={{ duration: 1.0 }}
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${image.file_path}`}
            alt={`Movie backdrop ${index + 1}`}
            className="w-full h-full object-cover"
            fill
            loading={index === 0 ? "eager" : "lazy"}
          />
        </motion.div>
      ))}
      {/* Gradient fades to black at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black" />
    </div>
  );
};

export default MovieImages;
