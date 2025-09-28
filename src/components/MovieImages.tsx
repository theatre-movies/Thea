// import React, { useEffect, useState } from "react";
// import { Carousel, CarouselContent } from "./ui/carousel";
// import Image from "next/image";

// const MovieImages = ({ images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 4000);

//     return () => clearInterval(timer);
//   }, [images.length]);

//   return (
//     <Carousel>
//       <CarouselContent className="p-4">
//         {images?.backdrops?.map((image, index: number) => (
//           <Image
//             key={index}
//             src={`https://image.tmdb.org/t/p/original${image.file_path}`}
//             alt={`Movie backdrop ${index + 1}`}
//             width={780}
//             height={439}
//             className={`object-cover transition-opacity duration-1000 ${
//               index === currentIndex ? "opacity-100" : "opacity-0"
//             }`}
//           />
//         ))}
//       </CarouselContent>
//     </Carousel>
//   );
// };

// export default MovieImages;

// // "use client";
// // import React, { useState, useEffect } from "react";
// // import Image from "next/image";

// // const MovieImages = ({ images }) => {
// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   useEffect(() => {
// //     if (images.length <= 1) return;

// //     const timer = setInterval(() => {
// //       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
// //     }, 4000); // Change image every 4 seconds

// //     return () => clearInterval(timer);
// //   }, [images.length]);

// //   if (images.length === 0) {
// //     return <div className="fixed inset-0 bg-black" />;
// //   }

// //   return (
// //     <div className="fixed inset-0">
// //       {images?.backdrops.map((image, index) => (
// //         <Image
// //           key={index}
// //           src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
// //           alt={`Backdrop ${index}`}
// //           fill
// //           className={`object-cover transition-opacity duration-1000 ${
// //             index === currentIndex ? "opacity-100" : "opacity-0"
// //           }`}
// //           priority={index === 0}
// //         />
// //       ))}
// //       {/* Dark overlay */}
// //       <div className="absolute inset-0 bg-black bg-opacity-40" />
// //     </div>
// //   );
// // };

// // export default MovieImages;

"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const MovieImages = ({ images }) => {
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

  return (
    <div className="fixed inset-0 overflow-hidden">
      {backdrops.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 -top-32 transition-opacity duration-1000 ease-in-out ${
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
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
        </div>
      ))}
    </div>
  );
};

export default MovieImages;
