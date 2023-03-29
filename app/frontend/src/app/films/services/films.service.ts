import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {Film} from '@models';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class FilmsService {
    private readonly apiUrl = 'http://localhost:3000/films';
    private readonly commentsUrl = 'http://localhost:3000/comments';


    constructor(private readonly httpClient: HttpClient) {
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

    getComments(filmId: string): Observable<Comment[]> {
        return this.httpClient.get<Comment[]>(
            `${this.commentsUrl}?filmId=${filmId}`
        );
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
