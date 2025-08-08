
export interface IInfo{
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export interface IApiResponse<T>{
    info: IInfo;
    results: T[];
}

export interface IOrigin{
    name: string;
    url: string;
}

export interface ICharacter {
    id: number;
    name: string;
    status: 'Alive' | 'Dead' | 'unknown';
    species: string;
    type: string;
    gender: string;
    origin: IOrigin;
    location: IOrigin;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export interface IEpisode{
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
}

export interface ILocation{
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
}