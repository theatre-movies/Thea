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

interface CastMember {
  adult: boolean;
  gender: number; // 0 (unknown), 1 (female), 2 (male)
  id: number;
  known_for_department: string; // e.g., "Acting"
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface CrewMember {
  adult: boolean;
  gender: number; // 0 (unknown), 1 (female), 2 (male)
  id: number;
  known_for_department: string; // e.g., "Directing", "Writing", etc.
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string; // e.g., "Writing", "Directing", "Production"
  job: string; // e.g., "Writer", "Director", "Producer"
}

interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

interface Video {
  iso_639_1: string; // Language code, e.g., "en"
  iso_3166_1: string; // Country code, e.g., "US"
  name: string; // Title of the video, e.g., "50th Anniversary Trailer"
  key: string; // Video identifier for the platform, e.g., YouTube video ID
  site: string; // Platform hosting the video, e.g., "YouTube"
  size: number; // Resolution of the video, e.g., 480, 720, 1080, 2160
  type: string; // Type of video, e.g., "Trailer", "Clip", "Featurette", "Behind the Scenes", "Teaser"
  official: boolean; // Whether the video is official
  published_at: string; // ISO 8601 timestamp, e.g., "2022-01-13T13:59:54.000Z"
  id: string; // Unique identifier for the video
}

interface MovieVideos {
  id: number; // Movie ID
  results: Video[]; // Array of video objects
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

interface searchMovies {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title?: string; // For movies
  name?: string; // For TV shows
  original_title?: string; // For movies
  original_name?: string; // For TV shows
  overview: string | null;
  poster_path: string | null;
  media_type: "movie" | "tv" | "person"; // Union type for media types
  original_language: string;
  genre_ids: number[]; // Updated to number[] from empty array
  popularity: number;
  release_date?: string; // For movies
  first_air_date?: string; // For TV shows
  video?: boolean; // Only in movies
  vote_average: number;
  vote_count: number;
  origin_country?: string[]; // Only in TV shows
  gender?: number; // For 'person' media type
  known_for_department?: string; // For 'person' media type
  profile_path?: string | null; // For 'person' media type
  known_for?: Array<{
    adult: boolean;
    backdrop_path: string | null;
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    media_type: "movie";
    original_language: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }>; // For 'person' media type
}

interface searchResponse {
  page: number;
  results: searchMovies[];
}

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
