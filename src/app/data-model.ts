export interface MovieDetails {
    Title?: string;
    Year?: string;
    Rated?: string;
    Released?: string;
    Season?: string;
    Episode?:string;
    Runtime?: string;
    Genre?: string;
    Director?: string;
    Writer?: string;
    Actors?: string;
    Plot?: string;
    Language?: string;
    Country?: string;
    Awards?: string;
    Poster?: string;
    Ratings?: Rating[];
    Metascore?: string;
    imdbRating?: string;
    imdbVotes?: string;
    imdbID?: string;
    seriesID?:string;
    Type?: string;
    DVD?: string;
    BoxOffice?: string;
    Production?: string;
    Website?: string;
    Response?: string;
    Error?: string;
}

export interface Rating {
    Source?: string;
    Value?: string;
}