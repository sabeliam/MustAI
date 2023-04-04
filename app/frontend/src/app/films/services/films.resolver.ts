import {Film} from '@models';
import {Store} from '@ngxs/store';
import {ResolveFn} from '@angular/router';
import {GetFilms} from '../store/films.actions';
import {FilmsState} from '../store/films.state';
import {map} from 'rxjs';
import {inject} from '@angular/core';

export const resolveFilms: ResolveFn<Film[]> = () => {
    const store: Store = inject(Store);

    return store.dispatch(new GetFilms()).pipe(
        map(() => store.selectSnapshot(FilmsState))
    );
}
