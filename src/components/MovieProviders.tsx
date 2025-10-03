import React from "react";
import { Play } from "lucide-react";
import Image from "next/image";

interface WatchProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

interface CountryProviders {
  link: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  ads?: WatchProvider[];
  free?: WatchProvider[];
}

interface MovieProvidersResponse {
  id: number;
  results: {
    [countryCode: string]: CountryProviders;
  };
}

interface MovieProvidersProps {
  providers?: MovieProvidersResponse;
  countryCode?: string;
}

export const MovieProviders: React.FC<MovieProvidersProps> = ({
  providers,
  countryCode = "IN",
}) => {
  // Extract country-specific providers
  const countryProviders = providers?.results?.[countryCode];

  if (!countryProviders) {
    return (
      <div className="pt-4">
        <div className="flex items-center gap-2 mb-4">
          <Play className="size-6 fill-yellow-500 stroke-none" />
          <h2 className="text-xl font-semibold text-neutral-200">
            Where to Watch
          </h2>
        </div>
        <p className="text-neutral-400 text-sm">
          No streaming information available for your region.
        </p>
      </div>
    );
  }

  const sections = [
    { key: "flatrate", label: "Stream", data: countryProviders.flatrate },
    { key: "buy", label: "Buy", data: countryProviders.buy },
    { key: "rent", label: "Rent", data: countryProviders.rent },
  ];

  const hasAnyProviders = sections.some(
    (section) => section.data && section.data.length > 0
  );

  if (!hasAnyProviders) {
    return (
      <div className="pt-4">
        <div className="flex items-center gap-2 mb-4">
          <Play className="size-6 fill-yellow-500 stroke-none" />
          <h2 className="text-xl font-semibold text-neutral-200">
            Where to Watch
          </h2>
        </div>
        <p className="text-neutral-400 text-sm">
          No streaming information available.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-4">
      <div className="flex items-center gap-2 mb-6">
        <Play className="size-6 fill-yellow-500 stroke-none" />
        <h2 className="text-xl font-semibold text-neutral-200">
          Where to Watch
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section) => {
          if (!section.data || section.data.length === 0) return null;

          return (
            <div key={section.key} className="space-y-3">
              <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
                {section.label}
              </h3>
              <div className="flex gap-x-2">
                {section.data
                  .sort((a, b) => a.display_priority - b.display_priority)
                  .map((provider) => (
                    <div
                      key={provider.provider_id}
                      className="group relative w-[60px] h-[60px] rounded-lg overflow-hidden border-neutral-700 "
                      title={provider.provider_name}
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                        alt={provider.provider_name}
                        fill
                        className="object-contain rounded-lg hover:ring-2 hover:ring-yellow-500 transition-all duration-200 cursor-pointer"
                        sizes="100px"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-lg"></div>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
