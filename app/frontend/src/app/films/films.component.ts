import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { FilmsState } from './store/films.state';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Film } from '@models';
import { RemoveFilm } from './store/films.actions';
import { TmdbClient } from '@core/description/tmdb/tmdb-client.service';
import { FormControl } from '@angular/forms';
import { FilmsService } from './services/films.service';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { FilmDialogComponent } from '@shared/components/film-dialog/film-dialog.component';
import { TuiSheetService } from '@taiga-ui/addon-mobile';
import { ViewType } from './components/main-view/main-view.component';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { slideInAnimation } from '@shared/animations/route-animation';

@Component({
    selector: 'app-films',
    templateUrl: './films.component.html',
    styleUrls: ['./films.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [slideInAnimation],
})
export class FilmsComponent {
    constructor(
        private readonly filmsService: FilmsService,
        private readonly tuiSheetService: TuiSheetService,
        private readonly injector: Injector,
        private contexts: ChildrenOutletContexts
    ) {}

    getRouteAnimationData() {
        console.log(this.contexts.getContext('primary'));

        return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
            'animation'
        ];
    }

    // addFilm(): void {
    //     // this.store.dispatch(new AddFilm(mockFilm()));
    //     this.filmsService.getFilms().subscribe(console.log);
    // }
}
