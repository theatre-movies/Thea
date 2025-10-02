"use client";
import { getsearchMedia } from "@/app/hooks/searchMedia";
import { Film } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResult] = useState<boolean>(false);
  const [cache, setCache] = useState<{ [key: string]: any[] }>({});

  const fetchData = async () => {
    if (cache[search]) {
      setResults(cache[search]);
      console.log("CACHED REQUEST");
      return;
    }
    const data = await getsearchMedia({ query: search });
    setResults(data?.results);
    setCache((prev) => ({ ...prev, [search]: data?.results }));
    console.log("API REQUEST", data);
  };
  useEffect(() => {
    const timer = setTimeout(fetchData, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <input
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        onFocus={() => setShowResult(true)}
        onBlur={() => setShowResult(false)}
        className="max-w-sm border-neutral-700 border outline-0  rounded-md p-2"
      />
      {showResults && (
        <div className="max-h-[300px] overflow-y-scroll space-y-2 border border-neutral-600 p-4  ">
          {results?.map((movie, idx) => (
            <div
              className="flex justify-between border-b border-neutral-700 items-center"
              key={idx}
            >
              <div className="flex gap-x-2 items-center ">
                {movie?.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                    width={40}
                    height={0}
                    alt="Poster"
                  />
                ) : (
                  <Film className="w-10 h-16" />
                )}

                <h1 className="text-lg tracking-tight font-[550] max-w-md ">
                  {movie?.title || movie?.original_name}
                </h1>
              </div>
              {movie?.release_date ? (
                <h1 className="">
                  {new Date(movie?.release_date).getFullYear()}
                </h1>
              ) : (
                <h1>-</h1>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
