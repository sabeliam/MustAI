import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    Injector,
    Input,
} from '@angular/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {
    TUI_IS_MOBILE_RES,
    TuiAlertService,
    TuiDialogService,
    TuiNotification,
} from '@taiga-ui/core';
import {map, Observable, of, switchMap, withLatestFrom} from 'rxjs';
import {Store} from '@ngxs/store';
import {AddFilm} from '../../films/store/films.actions';
import {Film} from '@models';
import {Answer, SearchResult, TmdbMovie, TmdbTv} from '@models/tmdb';
import {DescriptionService} from '@core/description/description.service';
import {TuiSheetService} from '@taiga-ui/addon-mobile';
import {FilmDialogComponent} from '@shared/components/film-dialog/film-dialog.component';
import {fromSearchResultToFilm} from '@shared/utils/filmDTO';
import {FilmsService} from '../../films/services/films.service';

@Component({
    selector: 'app-assistant-answer',
    templateUrl: './assistant-answer.component.html',
    styleUrls: ['./assistant-answer.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantAnswerComponent {
    @Input() answer!: string;

    openSideBar = false;

    constructor(
        private readonly descriptionService: DescriptionService,
        private readonly tuiSheetService: TuiSheetService,
        private readonly tuiDialogService: TuiDialogService,
        private readonly tuiAlertService: TuiAlertService,
        private readonly filmsService: FilmsService,
        private readonly injector: Injector,
        @Inject(TUI_IS_MOBILE_RES)
        private readonly isMobileRes$: Observable<boolean>
    ) {
    }

    extractName(string: string): string | null {
        const array = string.match(/(?<=\d. )(.*)(?= \(\d*\))/);

        return array && array[0];
    }

    getDescription(text: string): Observable<SearchResult | null> {
        const name = this.extractName(text);

        if (!name) {
            return of(null);
        }

        return this.descriptionService.findFirstFilmByName(name);
    }

    showDialog() {
        this.getDescription(this.answer)
            .pipe(
                switchMap((value) => {
                    if (!value) {
                        return this.tuiAlertService.open('Ошибка', {
                            status: TuiNotification.Error,
                        });
                    }

                    return this.tuiDialogService.open(
                        new PolymorpheusComponent(
                            FilmDialogComponent,
                            this.injector
                        ),
                        {
                            data: fromSearchResultToFilm(value) as any,
                            closeable: true,
                        }
                    );
                })
            )
            .subscribe();
    }

    addFilm() {
        this.getDescription(this.answer).subscribe((value) => {
            if (value) {
                const film: Film = fromSearchResultToFilm(value);

                debugger

                this.filmsService.addFilm(film).subscribe()
            }
        });
    }
}
