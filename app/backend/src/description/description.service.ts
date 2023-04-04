import {Injectable} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DescriptionService {
    private config = {
        headers: {Authorization: `Bearer ${process.env.TMDB_API_KEY}`}
    };

    constructor() {
    }

    public findFilmByImdbId(id: string): Promise<any> {
        const url = new URL(`https://api.themoviedb.org/3/find/${id}`);

        url.searchParams.append('external_source', 'imdb_id');
        url.searchParams.append('language', 'ru');

        return axios.get(url.toString(), this.config)
    }

    public findFilmByName(name: string): Promise<any> {
        const url = new URL('https://api.themoviedb.org/3/search/movie');

        url.searchParams.append('query', name);

        return axios.get(url.toString(), this.config)
    }
}
