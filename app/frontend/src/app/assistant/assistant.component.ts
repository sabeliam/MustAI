import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CompletionService} from '@core/completion/opeai/completion.service';
import {TuiAlertService, TuiDialogContext, TuiNotification,} from '@taiga-ui/core';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, catchError, EMPTY, from, map, switchMap, tap,} from 'rxjs';
import {TmdbClient} from '@core/description/tmdb/tmdb-client.service';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {fadeInList} from '@shared/animations/fade-in-list-animation';

export type FilmResponse = { genre: string, title: string, author: string }

@Component({
    selector: 'app-assistant',
    templateUrl: './assistant.component.html',
    styleUrls: ['./assistant.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInList],
})
export class AssistantComponent {
    input = new FormControl<string>('');
    isLoading = false;

    answer$: BehaviorSubject<FilmResponse[]> = new BehaviorSubject<FilmResponse[]>([]);

    constructor(
        private readonly openaiService: CompletionService,
        private readonly descriptionService: TmdbClient,
        private readonly tuiAlertService: TuiAlertService
    ) {
    }

    submit(): void {
        if (!this.input.value) {
            return;
        }

        this.isLoading = true;

        this.openaiService
            .getResponse(this.input.value)
            .pipe(
                map((value: { text: string }) => value.text || ''),
                map(value => this.getListFromText(value)),
                tap((value) => {
                    this.isLoading = false;
                    this.answer$.next(value);
                }),
                catchError((error) => {
                    this.isLoading = false;
                    console.error(error);
                    this.tuiAlertService.open('Something went wrong :(', {
                        status: TuiNotification.Error
                    }).subscribe();
                    return EMPTY;
                })
            )
            .subscribe();
    }


    getListFromText(text: string | undefined): FilmResponse[] {
        if (!text) {
            return [];
        }

        try {
            const json = JSON.parse(text);

            if (json.every((film: any) => film.genre && film.title && film.author)) {
                return json as FilmResponse[];
            } else {
                console.error('Wrong json format');

                this.tuiAlertService.open('Something went wrong :(', {
                    status: TuiNotification.Error
                }).subscribe();

                return [];
            }
        } catch (e) {
            console.error(e);

            this.tuiAlertService.open('Something went wrong :(', {
                status: TuiNotification.Error
            }).subscribe();
        }

        return [];

        // return text
        //     .split('\n')
        //     .filter((value) => !(value === '' || value === ' '));
    }

    toggle(text: string, content: PolymorpheusContent<TuiDialogContext>) {

    }
}
