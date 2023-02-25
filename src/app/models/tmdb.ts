export interface TMDBFILM {
    id: number;
    title: string;
    overview: string;
    popularity: number;
    adult: boolean;
    release_date: string;
    original_language: string;
    original_title: string;
    backdrop_path: string | null;
    belongs_to_collection: {
        backdrop_path: string;
        name: string;
        id: number;
        poster_path: string;
    };
    budget: number;
    genres: { name: string; id: number }[];
    homepage: string;
    imdb_id: string;
    poster_path: string;
    production_companies: {
        logo_path: string | null;
        name: string;
        id: number;
        origin_country: string;
    }[];
    production_countries: { iso_3166_1: string; name: string }[];
    revenue: number;
    runtime: number;
    spoken_languages: {
        name: string;
        iso_639_1: string;
        english_name: string;
    }[];
    status: string;
    tagline: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface TmdbMovie {
    overview: string;
    original_language: string;
    original_title: string;
    video: boolean;
    title: string;
    genre_ids: number[];
    poster_path: string | null;
    backdrop_path: null;
    release_date: string;
    popularity: number;
    vote_average: number;
    id: number;
    adult: boolean;
    vote_count: number;
}

export interface TmdbTv {
    overview: string;
    original_language: string;
    original_title: string;
    video: boolean;
    title: string;
    genre_ids: number[];
    poster_path: string | null;
    backdrop_path: null;
    first_air_date: string;
    popularity: number;
    vote_average: number;
    id: number;
    adult: boolean;
    vote_count: number;
}

export interface TmdbSearchResult {
    movie_results: Partial<TmdbMovie>[];
    person_results: any[];
    tv_results: Partial<TmdbTv>[];
    tv_episode_results: any[];
    tv_season_results: any[];
}
