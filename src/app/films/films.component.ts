import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FilmsState } from './films.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Film } from '@models';
import { AddFilm, RemoveFilm } from './films.actions';
import { mockFilm } from '../../mocks/film';
import { TmdbClient } from '@core/description/tmdb/tmdb-client.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-films',
    templateUrl: './films.component.html',
    styleUrls: ['./films.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsComponent {
    input = new FormControl<string>('');

    @Select(FilmsState.filmList) public filmList$: Observable<Film[]>;

    constructor(
        private readonly store: Store,
        private readonly descriptionsService: TmdbClient
    ) {}

    addFilm(): void {
        this.store.dispatch(new AddFilm(mockFilm()));
    }

    removeFilm(id: string): void {
        this.store.dispatch(new RemoveFilm(id));
    }

    getDescription() {
        if (!this.input.value) {
            return;
        }

        this.descriptionsService
            .findFilmByName(this.input.value)
            .subscribe(console.log);
    }
}
