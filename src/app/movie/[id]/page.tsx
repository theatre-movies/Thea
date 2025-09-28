// "use client";

// import getMovieCast from "@/app/hooks/getMovieCast";
// import getMovieDetails from "@/app/hooks/getMovieDetails";
// import getMovieImages from "@/app/hooks/getMovieImages";
// import getSImilarMovies from "@/app/hooks/getSimilarMovies";
// import MovieCastSection from "@/components/MovieCastSection";
// import MovieImages from "@/components/MovieImages";
// import VideosAndTrailersSection from "@/components/VIdeosAndTrailersSection";
// import { Calendar, Clock, Play, Star } from "lucide-react";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";

// const Page = () => {
//   const params = useParams();
//   const id = params.id;
//   const [movieDetails, setMovieDetails] = useState(null);
//   const [cast, setCast] = useState(null);
//   const [images, setImages] = useState(null);
//   const [videos, setVideos] = useState(null);
//   const [providers, setProviders] = useState(null);
//   const [similarMovies, setSimilarMovies] = useState(null);

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       const movieDatails = await getMovieDetails({ id: id as string });
//       setMovieDetails(movieDatails);

//       const fetchImages = await getMovieImages({ id: id as string });
//       setImages(fetchImages);
//       console.log(fetchImages);

//       const getCast = await getMovieCast({ id: id as string });
//       setCast(getCast);

//       const getMovieProviders = await getMovieDetails({ id: id as string });
//       setProviders(getMovieProviders);

//       const getMovieVideos = await getMovieDetails({ id: id as string });
//       setVideos(getMovieVideos);

//       const getSimilarMovies = await getSImilarMovies({ id: id as string });
//       setSimilarMovies(getSimilarMovies);
//     };
//     fetchMovieDetails();
//   }, [id]);

//   return (
//     <div className="relative">
//       <div className="z-10">
//         <MovieImages images={images} />
//       </div>
//       <div className="grid grid-cols-[25%_75%] z-50 relative mx-10 pt-96">
//         <div className="">
//           <Image
//             src={`https://image.tmdb.org/t/p/original/${movieDetails?.poster_path}`}
//             width={320}
//             height={450}
//             alt={"Movie Poster"}
//             className="rounded-lg border border-neutral-700"
//           />
//         </div>
//         <div className="space-y-2 flex flex-col justify-start text-neutral-400">
//           <Image
//             src={`https://image.tmdb.org/t/p/original/${images?.logos[4]?.file_path}`}
//             width={130}
//             height={130}
//             alt={"Movie Backdrop"}
//             className="rounded-lg "
//           />
//           <h1 className="text-xl tracking-tight italic py-2">
//             {'" '}
//             {movieDetails?.tagline}
//             {' "'}
//           </h1>
//           <div className="flex font-light">
//             <div className="flex gap-1 items-center ">
//               <Calendar className="size-4" />
//               <p className="pr-2">
//                 {new Date(movieDetails?.release_date).getFullYear()}
//               </p>
//             </div>
//             <div className="flex gap-1 items-center">
//               <Clock className="size-4" />
//               <p className="pr-2">
//                 {Math.floor(movieDetails?.runtime / 60)}h{" "}
//                 {movieDetails?.runtime % 60}m
//               </p>
//             </div>
//             <div className="flex gap-1 items-center">
//               <Star className="size-4 fill-yellow-500 stroke-none" />
//               <p className="pr-2">
//                 {Math.round(movieDetails?.vote_average * 10) / 10}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-2">
//             {movieDetails?.genres.map((genre: any) => (
//               <p
//                 key={genre.id}
//                 className="text-sm border px-2 py-1 rounded-full border-neutral-600"
//               >
//                 {genre.name}
//               </p>
//             ))}
//           </div>

//           <div className="">
//             <h2 className="text-2xl font-[550] py-4">Overview</h2>
//             <p className="text-neutral-500 leading-6">
//               {movieDetails?.overview}
//             </p>
//           </div>

//           <div className="">
//             <div className="flex items-center gap-2 ">
//               <Play className="size-6 fill-yellow-500 stroke-none" />
//               <h1 className="text-xl font-[550] text-neutral-300">
//                 Where to Watch
//               </h1>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="z-100 mx-10 pt-4">
//         <MovieCastSection actors={cast} title={"Cast"} />
//         <VideosAndTrailersSection movies={videos} title={"Videos & Trailers"} />
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";

import getMovieCast from "@/app/hooks/getMovieCast";
import getMovieDetails from "@/app/hooks/getMovieDetails";
import getMovieImages from "@/app/hooks/getMovieImages";
import getMovieProviders from "@/app/hooks/getMovieProviders";
import getMovieVideos from "@/app/hooks/getMovieVideos";
import getRecommendedMovies from "@/app/hooks/getRecommendeMovies";
import getSImilarMovies from "@/app/hooks/getSimilarMovies";
import MovieCastSection from "@/components/MovieCastSection";
import MovieImages from "@/components/MovieImages";
import MoviesSection from "@/components/MoviesSection";
import VideosAndTrailersSection from "@/components/VIdeosAndTrailersSection";
import { Calendar, Clock, Play, Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const Page = () => {
  const params = useParams();
  const id = params.id;
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState(null);
  const [images, setImages] = useState(null);
  const [videos, setVideos] = useState(null);
  const [providers, setProviders] = useState(null);
  const [similarMovies, setSimilarMovies] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fixed: Fetch movie details once
        const movieDetails = await getMovieDetails({ id: id as string });
        setMovieDetails(movieDetails);

        // Fixed: Fetch images using correct hook
        const fetchImages = await getMovieImages({ id: id as string });
        setImages(fetchImages);

        // Fixed: Fetch cast using correct hook
        const getCast = await getMovieCast({ id: id as string });
        setCast(getCast);

        // Fixed: Use separate hooks for providers and videos
        const fetchMovieProviders = await getMovieProviders({
          id: id as string,
        });
        setProviders(fetchMovieProviders);

        const fetchMovieVideos = await getMovieVideos({ id: id as string });
        setVideos(fetchMovieVideos);

        // Fixed: Fetch similar movies
        const getSimilarMovies = await getSImilarMovies({ id: id as string });
        setSimilarMovies(getSimilarMovies);

        const fetchRecommendedMovies = await getRecommendedMovies({
          id: id as string,
        });
        setRecommendedMovies(fetchRecommendedMovies);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  // Loading state
  if (!movieDetails) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Images */}
      <div className="fixed inset-0 z-0">
        <MovieImages images={images} />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[25%_75%] gap-8 mx-4 lg:mx-10 pt-20 lg:pt-96">
          {/* Movie Poster */}
          <div className="flex justify-center lg:justify-start">
            {movieDetails?.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
                width={320}
                height={450}
                alt={"Movie Poster"}
                className="rounded-lg border border-neutral-700"
                onError={(e) => {
                  console.error("Failed to load poster");
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
          </div>

          {/* Movie Details */}
          <div className="space-y-4 flex flex-col justify-start text-neutral-400">
            {/* Movie Logo */}
            {images?.logos?.[0]?.file_path && (
              <Image
                src={`https://image.tmdb.org/t/p/original/${images.logos[0].file_path}`}
                width={130}
                height={130}
                alt={"Movie Logo"}
                className="rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}

            {/* Tagline */}
            {movieDetails.tagline && (
              <h1 className="text-xl tracking-tight italic py-2 text-neutral-300">
                "{movieDetails.tagline}"
              </h1>
            )}

            {/* Movie Stats */}
            <div className="flex flex-wrap gap-4 font-light">
              {movieDetails.release_date && (
                <div className="flex gap-1 items-center">
                  <Calendar className="size-4" />
                  <p>{new Date(movieDetails.release_date).getFullYear()}</p>
                </div>
              )}

              {movieDetails.runtime && (
                <div className="flex gap-1 items-center">
                  <Clock className="size-4" />
                  <p>
                    {Math.floor(movieDetails.runtime / 60)}h{" "}
                    {movieDetails.runtime % 60}m
                  </p>
                </div>
              )}

              {movieDetails.vote_average && (
                <div className="flex gap-1 items-center">
                  <Star className="size-4 fill-yellow-500 stroke-none" />
                  <p>{Math.round(movieDetails.vote_average * 10) / 10}</p>
                </div>
              )}
            </div>

            {/* Genres */}
            {movieDetails.genres && movieDetails.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movieDetails.genres.map((genre: any) => (
                  <span
                    key={genre.id}
                    className="text-sm border px-2 py-1 rounded-full border-neutral-600 bg-neutral-800/50"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            {movieDetails.overview && (
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-neutral-200">
                  Overview
                </h2>
                <p className="text-neutral-400 leading-6 max-w-4xl">
                  {movieDetails.overview}
                </p>
              </div>
            )}

            {/* Where to Watch */}
            <div className="pt-4">
              <div className="flex items-center gap-2">
                <Play className="size-6 fill-yellow-500 stroke-none" />
                <h2 className="text-xl font-semibold text-neutral-200">
                  Where to Watch
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Cast and Videos Sections */}
        <div className="relative z-20 mx-4 lg:mx-10 pt-8 space-y-8">
          {/* Cast Section */}
          {cast && (
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6">
              <MovieCastSection actors={cast} title={"Cast"} />
            </div>
          )}

          {/* Videos Section */}
          {videos && (
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6">
              <VideosAndTrailersSection
                movies={videos}
                title={"Videos & Trailers"}
              />
            </div>
          )}

          {/* Similar Movies Section */}
          {similarMovies && (
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 mb-8">
              <MoviesSection movies={similarMovies} title={"Similar Movies"} />
            </div>
          )}

          {/* Recommendation Movies section */}
          {recommendedMovies && (
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 mb-8">
              <MoviesSection
                movies={recommendedMovies}
                title={"Recommended Movies"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
