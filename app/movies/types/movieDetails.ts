interface Collection {
    id: number;
    name: string;
    posterPath: string;
    backdropPath: string;
}

export interface Genre {
    id: number;
    name: string;
    image?: string
}

interface ProductionCompany {
    id: number;
    logoPath: string;
    name: string;
    originCountry: string;
}

interface ProductionCountry {
    iso31661: string;
    name: string;
}

interface SpokenLanguage {
    englishName: string;
    iso6391: string;
    name: string;
}

export interface MovieDetails {
    adult: boolean;
    backdropPath: string;
    belongsToCollection: Collection;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdbId: string;
    originCountry: string[];
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    posterPath: string;
    productionCompanies: ProductionCompany[];
    productionCountries: ProductionCountry[];
    releaseDate: string;
    revenue: number;
    runtime: number;
    spokenLanguages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    voteAverage: number;
    voteCount: number;
}