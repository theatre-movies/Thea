// for Movie card
interface TMDBMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string; // format: "YYYY-MM-DD"
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TMDBMoviesResponse {
  dates?: {
    maximum: string; // format: "YYYY-MM-DD"
    minimum: string; // format: "YYYY-MM-DD"
  };
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

// For movie Page
interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// For Image
interface Image {
  aspect_ratio: number;
  height: number;
  iso_3166_1: string | null;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

interface Media {
  backdrops: Image[];
  id: number;
  logos: Image[];
  posters: Image[];
}

// For Hero section
interface MediaItem {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title?: string;
  original_title?: string;
  overview: string;
  poster_path: string | null;
  media_type: "movie" | "tv";
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  first_air_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  original_name?: string;
  origin_country?: string[];
}

interface MediaResponse {
  page: number;
  results: MediaItem[];
  total_pages: number;
  total_results: number;
}
