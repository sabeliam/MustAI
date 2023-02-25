import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CompletionService } from '@core/completion/opeai/completion.service';
import {
    TuiAlertService,
    TuiDialogContext,
    TuiDialogService,
} from '@taiga-ui/core';
import { CreateCompletionResponse } from 'openai';
import { FormControl } from '@angular/forms';
import {
    BehaviorSubject,
    delay,
    from,
    map,
    mergeMap,
    Observable,
    of,
    scan,
    Subject,
    switchMap,
} from 'rxjs';
import { TmdbClient } from '@core/description/tmdb/tmdb-client.service';
import { Film } from '@models';
import { BaseItem } from '@models/base-item';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { tuiFadeInList } from './animation';

@Component({
    selector: 'app-assistant',
    templateUrl: './assistant.component.html',
    styleUrls: ['./assistant.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [tuiFadeInList],
})
export class AssistantComponent {
    input = new FormControl<string>('');
    isLoading = false;

    answer$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    constructor(
        private readonly openaiService: CompletionService,
        private readonly descriptionService: TmdbClient,
        private readonly dialogService: TuiDialogService
    ) {}

    submit() {
        if (!this.input.value) {
            return;
        }

        this.isLoading = true;
        this.openaiService
            .getResponse(this.input.value)
            .pipe(
                map(
                    (value: CreateCompletionResponse) =>
                        value.choices[0].text || ''
                ),
                switchMap((value: string) => {
                    return from(this.getListFromText(value));
                })
                // mergeMap((value) => this.getDescription(value)),
                // scan((films, film) => films.concat(film), [])
            )
            .subscribe((value) => {
                this.isLoading = false;
                this.answer$.next([...this.answer$.getValue(), value]);
            });
        // .subscribe((value: CreateCompletionResponse) => {
        //     console.log('value');
        //     this.isLoading = false;
        //     this.answer$.next(value);
        // });
    }

    getListFromText(text: string | undefined): string[] {
        if (!text) {
            return [];
        }

        return text
            .split('\n')
            .filter((value) => !(value === '' || value === ' '));
    }

    toggle(text: string, content: PolymorpheusContent<TuiDialogContext>) {
        // this.openSideBar = !this.openSideBar;
        // this.getDescription(text)
        //     .pipe(
        //         map((value) => this.getItem(value)),
        //         switchMap((value) => {
        //             return this.dialogService.open(content, {
        //                 data: value,
        //                 closeable: true,
        //             });
        //         })
        //     )
        //     .subscribe();
    }
}
