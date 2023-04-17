import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CompletionService} from '@core/completion/opeai/completion.service';
import {TuiAlertService, TuiDialogContext, TuiNotification,} from '@taiga-ui/core';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, catchError, EMPTY, from, map, switchMap, tap,} from 'rxjs';
import {TmdbClient} from '@core/description/tmdb/tmdb-client.service';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {fadeInList} from '@shared/animations/fade-in-list-animation';

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

    answer$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

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
                switchMap((value: string) => from(this.getListFromText(value))),
                tap((value) => {
                    this.isLoading = false;
                    this.answer$.next([...this.answer$.getValue(), value]);
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
