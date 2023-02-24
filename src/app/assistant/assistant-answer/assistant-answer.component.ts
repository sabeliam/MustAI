import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { BaseItem } from '@models/base-item';
import { map, Observable, of, switchMap } from 'rxjs';
import { DescriptionService } from '@core/tmdb/description/description.service';
import { Store } from '@ngxs/store';
import { AddFilm } from '../../films/films.actions';
import { Film } from '@models';

interface TMDBFILM {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {
        backdrop_path: string;
        name: string;
        id: number;
        poster_path: string;
    };
    budget: number;
    genres: { name: string; id: number }[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: {
        logo_path: string | null;
        name: string;
        id: number;
        origin_country: string;
    }[];
    production_countries: { iso_3166_1: string; name: string }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: {
        name: string;
        iso_639_1: string;
        english_name: string;
    }[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

@Component({
    selector: 'app-assistant-answer',
    templateUrl: './assistant-answer.component.html',
    styleUrls: ['./assistant-answer.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantAnswerComponent {
    @Input() answer!: any;

    openSideBar = false;

    constructor(
        private readonly descriptionService: DescriptionService,
        private readonly dialogService: TuiDialogService,
        private readonly store: Store
    ) {}

    toggle(open: boolean) {
        this.openSideBar = open;
    }

    getDescription(text: string): Observable<TMDBFILM | null> {
        const id = this.extractId(text);

        if (!id) {
            return of(null);
        }

        return this.descriptionService.getDescription(id);
    }

    extractId(string: string): string | null {
        const array = string.match(/tt\d*/);

        return array && array[0];
    }

    getImgUrl(poster_path: string) {
        return `https://image.tmdb.org/t/p/w500/${poster_path}`;
    }

    showDialog(content: any) {
        this.getDescription(this.answer)
            .pipe(
                switchMap((value) => {
                    return this.dialogService.open(content, {
                        data: value,
                        closeable: true,
                    });
                })
            )
            .subscribe();
    }

    //
    getItem(object: TMDBFILM): Film {
        return {
            id: String(object.id),
            name: object.title,
            description: object.overview,
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
