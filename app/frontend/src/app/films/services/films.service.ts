import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Environment, Film} from '@models';
import {ENVIRONMENT} from '@core/environment/environment';
import {Store} from '@ngxs/store';
import {AddFilm, RemoveFilm} from '../store/films.actions';

@Injectable({
    providedIn: 'root',
})
export class FilmsService {
    constructor(
        private readonly store: Store
    ) {
    }

    addFilm(film: Film): Observable<any> {
        return this.store.dispatch(new AddFilm(film));
    }

    removeFilm(filmId: string): Observable<any> {
        return this.store.dispatch(new RemoveFilm(filmId));
    }
}
