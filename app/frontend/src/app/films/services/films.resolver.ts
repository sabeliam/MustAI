import {Film} from '@models';
import {Store} from '@ngxs/store';
import {ResolveFn, Router} from '@angular/router';
import {SelectCurrentFilm} from '../store/films.actions';
import {inject} from '@angular/core';
import {FilmsState} from '../store/films.state';
import {Observable} from 'rxjs';

export const resolveFilm: ResolveFn<Film> = (route, state) => {
    const store: Store = inject(Store);
    const router: Router = inject(Router);
    const selectedFilmId = route.params.id;

    if (!selectedFilmId) {
        router.navigateByUrl('library').then();
    }

    store.dispatch(new SelectCurrentFilm(selectedFilmId));

    return store.select(FilmsState.currentFilm) as Observable<Film>;
}
