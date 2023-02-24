import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FilmsState } from './films.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Film } from '@models';
import { AddFilm, RemoveFilm } from './films.actions';
import { mockFilm } from '../../mocks/film';
import { DescriptionService } from '@core/tmdb/description/description.service';

@Component({
    selector: 'app-films',
    templateUrl: './films.component.html',
    styleUrls: ['./films.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsComponent {
    @Select(FilmsState.filmList) public filmList$: Observable<Film[]>;

    constructor(private readonly store: Store) {}

    addFilm(): void {
        this.store.dispatch(new AddFilm(mockFilm()));
    }

    removeFilm(id: string): void {
        this.store.dispatch(new RemoveFilm(id));
    }

    getDescription() {}
}
