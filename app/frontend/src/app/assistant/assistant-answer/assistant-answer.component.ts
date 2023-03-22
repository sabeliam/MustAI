import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    Injector,
    Input,
} from '@angular/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import {
    TUI_IS_MOBILE_RES,
    TuiAlertService,
    TuiDialogService,
    TuiNotification,
} from '@taiga-ui/core';
import { map, Observable, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngxs/store';
import { AddFilm } from '../../films/store/films.actions';
import { Film } from '@models';
import { Answer, SearchResult, TmdbMovie, TmdbTv } from '@models/tmdb';
import { DescriptionService } from '@core/description/description.service';
import { TuiSheetService } from '@taiga-ui/addon-mobile';
import { FilmDialogComponent } from '@shared/components/film-dialog/film-dialog.component';

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
        private readonly store: Store,
        private readonly injector: Injector,
        @Inject(TUI_IS_MOBILE_RES)
        private readonly isMobileRes$: Observable<boolean>
    ) {}

    // getDescription(text: string): Observable<Answer | null> {
    //     const id = this.extractId(text);
    //
    //     if (!id) {
    //         return of(null);
    //     }
    //
    //     return this.descriptionService.findFilmByImdbId(id).pipe(
    //         map((value) => {
    //             if (value === null) {
    //                 return value;
    //             }
    //
    //             const answer: Answer = {
    //                 ...value,
    //                 imdb_id: id,
    //             };
    //
    //             return answer;
    //         })
    //     );
    // }
    //
    // extractId(string: string): string | null {
    //     const array = string.match(/tt\d*/);
    //
    //     return array && array[0];
    // }

    extractName(string: string): string | null {
        const array = string.match(/(?<=\d. )(.*)(?= \(\d*\))/);

        return array && array[0];
    }

    getDescription(text: string): Observable<SearchResult | null> {
        const name = this.extractName(text);

        if (!name) {
            return of(null);
        }

        return this.descriptionService.findFilmByName(name);
    }

    getImgUrl(poster_path: string | null): string | null {
        if (!poster_path) {
            return null;
        }

        return `https://image.tmdb.org/t/p/w500/${poster_path}`;
    }

    showDialog() {
        this.getDescription(this.answer)
            .pipe(
                withLatestFrom(this.isMobileRes$),
                switchMap(([value, isMobileRes]) => {
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
                            data: this.getItem(value) as any,
                            closeable: true,
                        }
                    );
                })
            )
            .subscribe();
    }

    getItem(object: SearchResult): Film {
        return {
            id: String(object.id),
            name: object.title,
            description: object.overview,
            imgUrl: this.getImgUrl(object.poster_path),
            // imdb_id: object.imdb_id,
            comments: [],
        };
    }

    addFilm() {
        this.getDescription(this.answer).subscribe((value) => {
            if (value) {
                this.store.dispatch(new AddFilm(this.getItem(value)));
            }
        });
    }
}
