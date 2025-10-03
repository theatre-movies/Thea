import React from "react";
import { CirclePlay, LibraryBig, TrendingUp } from "lucide-react";

// Hero Section Skeleton
export const HeroSectionSkeleton = () => {
  return (
    <div className="relative w-full h-[88vh] bg-gradient-to-b from-neutral-900 to-neutral-950 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 space-y-4">
        <div className="h-12 w-3/4 sm:w-1/2 bg-neutral-800 rounded-lg" />
        <div className="h-6 w-1/2 sm:w-1/3 bg-neutral-800 rounded-lg" />
        <div className="h-4 w-full sm:w-2/3 bg-neutral-800 rounded-lg" />
        <div className="h-4 w-5/6 sm:w-1/2 bg-neutral-800 rounded-lg" />
        <div className="flex gap-4 mt-6">
          <div className="h-12 w-32 bg-neutral-800 rounded-lg" />
          <div className="h-12 w-32 bg-neutral-800 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

// Movie Card Skeleton
export const MovieCardSkeleton = () => {
  return (
    <div className="flex-shrink-0 w-48 space-y-2 animate-pulse">
      <div className="relative aspect-[2/3] bg-neutral-800 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-900" />
      </div>
      <div className="h-4 w-3/4 bg-neutral-800 rounded" />
      <div className="h-3 w-1/2 bg-neutral-800 rounded" />
    </div>
  );
};

// Movies Section Skeleton
export const MoviesSectionSkeleton = ({
  title,
  logo,
}: {
  title: string;
  logo: React.ReactNode;
}) => {
  return (
    <div className="space-y-4 mb-12">
      <div className="flex items-center gap-3 mb-6">
        {logo}
        <h2 className="text-2xl font-semibold text-neutral-200">{title}</h2>
      </div>
      <div className="flex gap-4 overflow-x-hidden">
        {[...Array(6)].map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

// Full Page Loading Skeleton
export const PageLoadingSkeleton = () => {
  return (
    <div className="relative space-y-12 min-h-screen bg-black">
      {/* Navbar Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-neutral-800">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="h-8 w-32 bg-neutral-800 rounded animate-pulse" />
          <div className="flex gap-4">
            <div className="h-10 w-24 bg-neutral-800 rounded animate-pulse" />
            <div className="h-10 w-24 bg-neutral-800 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="w-full mt-12">
        <HeroSectionSkeleton />
      </div>

      {/* Movie Sections Skeleton */}
      <div className="sm:mx-20 space-y-8">
        <MoviesSectionSkeleton
          title="Now Playing"
          logo={<CirclePlay className="text-neutral-200 size-8" />}
        />
        <MoviesSectionSkeleton
          title="Top Rated"
          logo={<LibraryBig className="text-neutral-200 size-8" />}
        />
        <MoviesSectionSkeleton
          title="Popular Movies"
          logo={<TrendingUp className="text-neutral-200 size-8" />}
        />
      </div>
    </div>
  );
};

export const MovieDetailSkeleton = () => {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Navbar Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-neutral-800">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="h-8 w-32 bg-neutral-800 rounded animate-pulse" />
          <div className="flex gap-4">
            <div className="h-10 w-24 bg-neutral-800 rounded animate-pulse" />
            <div className="h-10 w-24 bg-neutral-800 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Background Hero Skeleton */}
      <div className="absolute inset-x-0 -top-4 z-0 h-[600px]">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900 to-black animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[25%_75%] gap-8 mx-4 lg:mx-10 pt-20 lg:pt-96">
          {/* Movie Poster Skeleton */}
          <div className="flex flex-col justify-center lg:justify-start space-y-4 pb-8 border-b-2 rounded-md sm:border-0 sm:pb-0 sm:rounded-none border-neutral-800">
            <div className="aspect-[2/3] w-full max-w-[320px] bg-neutral-800 rounded-lg animate-pulse sm:mx-0 mx-9" />
            <div className="h-10 w-[90%] bg-neutral-800 rounded animate-pulse sm:mx-0 mx-4" />
            <div className="h-10 w-[90%] bg-neutral-800 rounded animate-pulse sm:mx-0 mx-4" />
          </div>

          {/* Movie Details Skeleton */}
          <div className="space-y-6 flex flex-col justify-start">
            {/* Logo Skeleton */}
            <div className="h-16 w-48 bg-neutral-800 rounded-lg animate-pulse" />

            {/* Tagline Skeleton */}
            <div className="h-6 w-3/4 bg-neutral-800 rounded animate-pulse" />

            {/* Movie Stats Skeleton */}
            <div className="flex flex-wrap gap-4">
              <div className="h-5 w-20 bg-neutral-800 rounded animate-pulse" />
              <div className="h-5 w-24 bg-neutral-800 rounded animate-pulse" />
              <div className="h-5 w-16 bg-neutral-800 rounded animate-pulse" />
            </div>

            {/* Genres Skeleton */}
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-20 bg-neutral-800 rounded-md animate-pulse"
                />
              ))}
            </div>

            {/* Overview Skeleton */}
            <div className="space-y-3">
              <div className="h-7 w-32 bg-neutral-800 rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
                <div className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-neutral-800 rounded animate-pulse" />
              </div>
            </div>

            {/* Where to Watch Skeleton */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="size-6 bg-neutral-800 rounded animate-pulse" />
                <div className="h-6 w-40 bg-neutral-800 rounded animate-pulse" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <div className="h-4 w-16 bg-neutral-800 rounded animate-pulse" />
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(3)].map((_, j) => (
                        <div
                          key={j}
                          className="w-[100px] h-[80px] bg-neutral-800 rounded-lg animate-pulse"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cast and Videos Sections Skeleton */}
        <div className="relative z-20 mx-4 lg:mx-10 pt-8 space-y-8">
          {/* Cast Section Skeleton */}
          <div className="bg-neutral-900/40 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-8 bg-neutral-800 rounded animate-pulse" />
              <div className="h-7 w-24 bg-neutral-800 rounded animate-pulse" />
            </div>
            <div className="flex gap-4 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex-shrink-0 space-y-2">
                  <div className="w-32 h-48 bg-neutral-800 rounded-lg animate-pulse" />
                  <div className="h-4 w-28 bg-neutral-800 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-neutral-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Videos Section Skeleton */}
          <div className="bg-neutral-900/40 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-8 bg-neutral-800 rounded animate-pulse" />
              <div className="h-7 w-48 bg-neutral-800 rounded animate-pulse" />
            </div>
            <div className="flex gap-4 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-80 space-y-2">
                  <div className="w-full aspect-video bg-neutral-800 rounded-lg animate-pulse" />
                  <div className="h-4 w-3/4 bg-neutral-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Similar Movies Section Skeleton */}
          <div className="bg-neutral-900/40 backdrop-blur-sm rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-8 bg-neutral-800 rounded animate-pulse" />
              <div className="h-7 w-40 bg-neutral-800 rounded animate-pulse" />
            </div>
            <div className="flex gap-4 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-48 space-y-2">
                  <div className="w-full aspect-[2/3] bg-neutral-800 rounded-lg animate-pulse" />
                  <div className="h-4 w-3/4 bg-neutral-800 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-neutral-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Movies Section Skeleton */}
          <div className="bg-neutral-900/40 backdrop-blur-sm rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-8 bg-neutral-800 rounded animate-pulse" />
              <div className="h-7 w-56 bg-neutral-800 rounded animate-pulse" />
            </div>
            <div className="flex gap-4 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-48 space-y-2">
                  <div className="w-full aspect-[2/3] bg-neutral-800 rounded-lg animate-pulse" />
                  <div className="h-4 w-3/4 bg-neutral-800 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-neutral-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo Component
export default function SkeletonDemo() {
  return (
    <div className="bg-black min-h-screen">
      <PageLoadingSkeleton />
    </div>
  );
}
