import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CompletionService } from '../core/services/completion/completion.service';
import { TuiAlertService } from '@taiga-ui/core';
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
    Subject,
    switchMap,
} from 'rxjs';
import { DescriptionService } from '@core/services/description/description.service';
import { Film } from '@models';
import { BaseItem } from '@models/base-item';

@Component({
    selector: 'app-assistant',
    templateUrl: './assistant.component.html',
    styleUrls: ['./assistant.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantComponent {
    input = new FormControl<string>('');
    isLoading = false;

    answer$: BehaviorSubject<Film[]> = new BehaviorSubject<Film[]>([]);

    constructor(
        private readonly openaiService: CompletionService,
        private readonly descriptionService: DescriptionService
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
                }),
                mergeMap((value) =>
                    this.getDescription(value).pipe(delay(1000))
                )
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

    getItem(object: any): BaseItem {
        return {
            id: object.id,
            name: object.title,
            description: object.overview,
            imgUrl: `https://image.tmdb.org/t/p/w500/${object.poster_path}`,
        };
    }

    getListFromText(text: string | undefined): string[] {
        if (!text) {
            return [];
        }

        return text
            .split('\n')
            .filter((value) => !(value === '' || value === ' '));
    }

    getDescription(text: string): Observable<any> {
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
}
