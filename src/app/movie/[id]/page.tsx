"use client";

import getMovieCast from "@/app/hooks/getMovieCast";
import getMovieDetails from "@/app/hooks/getMovieDetails";
import getMovieImages from "@/app/hooks/getMovieImages";
import getSImilarMovies from "@/app/hooks/getSimilarMovies";
import MovieImages from "@/components/MovieImages";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";

const Page = () => {
  const params = useParams();
  const id = params.id;
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState(null);
  const [images, setImages] = useState(null);
  const [videos, setVideos] = useState(null);
  const [providers, setProviders] = useState(null);
  const [similarMovies, setSimilarMovies] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieDatails = await getMovieDetails({ id: id as string });
      setMovieDetails(movieDatails);

      const fetchImages = await getMovieImages({ id: id as string });
      setImages(fetchImages);
      console.log(fetchImages);

      const getCast = await getMovieCast({ id: id as string });
      setCast(getCast);

      const getMovieProviders = await getMovieDetails({ id: id as string });
      setProviders(getMovieProviders);

      const getMovieVideos = await getMovieDetails({ id: id as string });
      setVideos(getMovieVideos);

      const getSimilarMovies = await getSImilarMovies({ id: id as string });
      setSimilarMovies(getSimilarMovies);
    };
    fetchMovieDetails();
  }, [id]);

  
  return (
    <div className="relative">
      <div className="z-0">
        <MovieImages images={images} />
      </div>
      <div className="grid grid-cols-[25%_75%] z-50 relative mx-10 pt-88">
        <div className="">
          <Image
            src={`https://image.tmdb.org/t/p/original/${movieDetails?.poster_path}`}
            width={320}
            height={450}
            alt={"Movie Poster"}
            className="rounded-lg border border-neutral-700"
          />
        </div>
        <div className="space-y-2 ">
          <Image
            src={`https://image.tmdb.org/t/p/original/${images?.logos[4]?.file_path}`}
            width={150}
            height={150}
            alt={"Movie Backdrop"}
            className="rounded-lg "
          />
          <h1 className="text-xl tracking-tight italic py-2">
            {'" '}
            {movieDetails?.tagline}
            {' "'}
          </h1>
          <div className="flex ">

          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
