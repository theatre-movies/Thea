"use client";
import { getsearchMedia } from "@/app/hooks/searchMedia";
import { Film, X } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "./ui/button";
import Link from "next/link";

type Movie = {
  poster_path?: string | null;
  title?: string | null;
  original_name?: string | null;
  release_date?: string | null;
};

const MIN_CHARS = 2;
const DEBOUNCE_MS = 350;

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<searchMovies[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState<Record<string, searchMovies[]>>({});

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    const q = search.trim();
    if (q.length < MIN_CHARS) {
      setResults([]);
      return;
    }
    if (cache[q]) {
      setResults(cache[q]);
      return;
    }
    const data = (await getsearchMedia({ query: q })) as searchResponse;
    const next = data?.results ?? [];
    setResults(next);
    setCache((prev) => ({ ...prev, [q]: next }));
  };

  // Debounced fetch
  useEffect(() => {
    const timer = setTimeout(fetchData, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [search]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const hasQuery = search.trim().length >= MIN_CHARS;
  const shouldShow = showResults && hasQuery;

  return (
    <div ref={containerRef} className="relative w-80">
      <div className="flex justify-between border border-neutral-700 rounded-md">
        <input
          ref={inputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowResults(true)}
          onKeyDown={(e) => e.key === "Escape" && setShowResults(false)}
          placeholder="Find your sauce"
          className="flex-1 outline-0 p-2 bg-neutral-950 text-neutral-200 placeholder:text-neutral-500 rounded-l-md"
        />
        {search && (
          <Button
            variant="ghost"
            onClick={() => setSearch("")}
            className="hover:bg-transparent hover:text-neutral-300"
          >
            <X size={16} strokeWidth={2} />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {shouldShow && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 w-full max-h-60 overflow-y-auto rounded-md border border-neutral-700 bg-neutral-950 p-2 shadow-lg z-50"
          >
            {results.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="px-2 py-3 text-sm text-neutral-400"
              >
                No results found.
              </motion.div>
            ) : (
              <ul className="space-y-2">
                {results.map((movie, idx) => (
                  <Link
                    href={`/movie/${movie?.id}`}
                    key={idx}
                    className="flex items-center justify-between border-b border-neutral-800/60 last:border-none pb-2"
                  >
                    <motion.div
                      className="flex items-center gap-x-2"
                      initial={{ opacity: 0, x: 20, filter: "blur(3px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.3,
                        staggerChildren: 0.2 * idx,
                        delay: idx * 0.3,
                      }}
                    >
                      {movie?.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          width={40}
                          height={60}
                          alt={`${
                            movie?.title || movie?.original_name || "Poster"
                          } poster`}
                          className="rounded"
                        />
                      ) : (
                        <Film className="w-10 h-14 text-neutral-500" />
                      )}
                      <h2 className="text-[15px] leading-5 font-semibold text-neutral-100 max-w-md">
                        {movie?.title || movie?.original_name}
                      </h2>
                    </motion.div>
                    {movie?.release_date ? (
                      <motion.span
                        className="text-sm text-neutral-400"
                        initial={{ opacity: 0, x: 20, filter: "blur(3px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.3 }}
                      >
                        {new Date(movie.release_date).getFullYear()}
                      </motion.span>
                    ) : (
                      <span className="text-sm text-neutral-600">-</span>
                    )}
                  </Link>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchInput;
