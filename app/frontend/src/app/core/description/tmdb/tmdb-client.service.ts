import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ENVIRONMENT} from '../../environment/environment';
import {Environment} from '@models';
import {SearchResult, SearchResults, TmdbSearchResult} from '@models/tmdb';

@Injectable()
export class TmdbClient {
    private readonly apiUrl = `${this.env.apiUrl}/description`;

    constructor(
        @Inject(ENVIRONMENT) private readonly env: Environment,
        private readonly httpClient: HttpClient
    ) {
    }

    public findFilmByImdbId(id: string): Observable<TmdbSearchResult> {
        return this.httpClient.get<TmdbSearchResult>(`${this.apiUrl}/findFilmByImdbId/${id}`);
    }

    public findFilmByName(name: string): Observable<SearchResults> {
        return this.httpClient.get<SearchResults>(`${this.apiUrl}/findFilmByName/?query=${name}`);
    }
}
