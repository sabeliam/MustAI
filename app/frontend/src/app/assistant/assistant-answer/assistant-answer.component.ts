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
import {catchError, map, Observable, of, switchMap, tap, withLatestFrom} from 'rxjs';
import {Film} from '@models';
import {Answer, SearchResult, TmdbMovie, TmdbTv} from '@models/tmdb';
import {DescriptionService} from '@core/description/description.service';
import {TuiSheetService} from '@taiga-ui/addon-mobile';
import {FilmDialogComponent} from '@shared/components/film-dialog/film-dialog.component';
import {fromSearchResultToFilm} from '@shared/utils/filmDTO';
import {FilmsService} from '../../films/services/films.service';
import {FilmResponse} from '../assistant.component';

@Component({
    selector: 'app-assistant-answer',
    templateUrl: './assistant-answer.component.html',
    styleUrls: ['./assistant-answer.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantAnswerComponent {
    @Input() answer!: FilmResponse;

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

    getDescription(text: string): Observable<SearchResult | null> {
        return this.descriptionService.findFirstFilmByName(text);
    }

    showDialog() {
        this.getDescription(this.answer.title)
            .pipe(
                switchMap((value) => {
                    if (value === null) {
                        return this.showFilmNotFoundError();
                    }

                    const film: Film = fromSearchResultToFilm(value);

                    return this.tuiDialogService.open(
                        new PolymorpheusComponent(
                            FilmDialogComponent,
                            this.injector
                        ),
                        {
                            data: film as any,
                            closeable: true,
                        }
                    );
                })
            )
            .subscribe();
    }

    addFilm(): void {
        this.getDescription(this.answer.title).pipe(
            switchMap(value => {
                if (value === null) {
                    return this.showFilmNotFoundError();
                }

                const film: Film = fromSearchResultToFilm(value);

                return this.filmsService.addFilm(film);
            }),
            catchError((err) => {
                console.error(err);

                return this.showErrorNotification();
            })
        ).subscribe();
    }

    private showFilmNotFoundError() {
        return this.tuiAlertService.open('Фильм не найден', {
            status: TuiNotification.Warning,
        });
    }

    private showErrorNotification() {
        return this.tuiAlertService.open('Ошибка', {
            status: TuiNotification.Error,
        });
    }
}
