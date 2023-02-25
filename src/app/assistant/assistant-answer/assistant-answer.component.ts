import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import {
    TuiAlertService,
    TuiDialogContext,
    TuiDialogService,
} from '@taiga-ui/core';
import { BaseItem } from '@models/base-item';
import { map, Observable, of, switchMap } from 'rxjs';
import { TmdbClient } from '@core/description/tmdb/tmdb-client.service';
import { Store } from '@ngxs/store';
import { AddFilm } from '../../films/films.actions';
import { Film } from '@models';
import { TmdbMovie, TmdbTv } from '@models/tmdb';
import { DescriptionService } from '@core/description/description.service';
import { TuiSheetService } from '@taiga-ui/addon-mobile';

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
        private readonly tuiAlertService: TuiAlertService,
        private readonly store: Store
    ) {}

    toggle(open: boolean) {
        this.openSideBar = open;
    }

    getDescription(text: string): Observable<TmdbMovie | TmdbTv | null> {
        const id = this.extractId(text);

        if (!id) {
            return of(null);
        }

        return this.descriptionService.findFilmByImdbId(id);
    }

    extractId(string: string): string | null {
        const array = string.match(/tt\d*/);

        return array && array[0];
    }

    getImgUrl(poster_path: string | null): string | null {
        if (!poster_path) {
            return null;
        }

        return `https://image.tmdb.org/t/p/w500/${poster_path}`;
    }

    showDialog(content: any) {
        this.getDescription(this.answer)
            .pipe(
                switchMap((value) => {
                    return this.tuiSheetService.open(content, {
                        data: value as any,
                        closeable: true,
                    });
                })
            )
            .subscribe();
    }

    //
    getItem(object: TmdbMovie | TmdbTv): Film {
        return {
            id: String(object.id),
            name: object.title,
            description: object.overview,
            imgUrl: this.getImgUrl(object.poster_path),
        };
    }

    addFilm() {
        this.getDescription(this.answer).subscribe((value) => {
            if (value) {
                this.store
                    .dispatch(new AddFilm(this.getItem(value)))
                    .subscribe(() =>
                        this.tuiAlertService.open('Добавлено').subscribe()
                    );
            }
        });
    }
}
