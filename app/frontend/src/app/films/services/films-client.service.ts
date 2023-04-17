import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Environment, Film} from '@models';
import {ENVIRONMENT} from '@core/environment/environment';

@Injectable({
    providedIn: 'root',
})
export class FilmsClientService {
    private readonly apiUrl = `${this.env.apiUrl}/films`;


    constructor(
        private readonly httpClient: HttpClient,
        @Inject(ENVIRONMENT) private readonly env: Environment
    ) {
    }

    getFilms(): Observable<Film[]> {
        return this.httpClient.get<Film[]>(`${this.apiUrl}/list`)
            .pipe();
    }

    addFilm(film: Film): Observable<any> {
        return this.httpClient.post(`${this.apiUrl}/add`, film);
    }

    patchFilm(film: Partial<Film>): Observable<any> {
        return this.httpClient.patch(`${this.apiUrl}/edit/${film.id}`, film);
    }

    removeFilm(id: string): Observable<any> {
        return this.httpClient.delete(`${this.apiUrl}/remove/${id}`);
    }

    //
    // addComment(comment: Comment): Observable<any> {
    //     return this.httpClient.post<Film[]>(this.commentsUrl, comment);
    // }
    //
    // removeComment(id: string): Observable<any> {
    //     return this.httpClient.delete<Film[]>(`${this.commentsUrl}/${id}`);
    // }
}
