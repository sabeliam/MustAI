import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../environment/environment';
import { Environment } from '@models';
import { TmdbSearchResult } from '@models/tmdb';

@Injectable()
export class TmdbClient {
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.env.tmdbApiKey}`,
    });

    constructor(
        @Inject(ENVIRONMENT) private readonly env: Environment,
        private readonly httpClient: HttpClient
    ) {}

    public findFilmByImdbId(id: string): Observable<TmdbSearchResult> {
        const url = new URL(`https://api.themoviedb.org/3/find/${id}`);

        url.searchParams.append('external_source', 'imdb_id');
        url.searchParams.append('language', 'en');

        return this.httpClient.get<TmdbSearchResult>(url.toString(), {
            headers: this.headers,
        });
    }

    public findFilmByName(name: string): Observable<any> {
        const url = new URL('https://api.themoviedb.org/3/search/movie');

        url.searchParams.append('query', name);

        return this.httpClient.get(url.toString(), {
            headers: this.headers,
        });
    }
}
