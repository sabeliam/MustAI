import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CompletionService } from '../core/services/completion/completion.service';
import { TuiAlertService } from '@taiga-ui/core';
import { CreateCompletionResponse } from 'openai';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-assistant',
    templateUrl: './assistant.component.html',
    styleUrls: ['./assistant.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantComponent {
    input = new FormControl<string>('');
    isLoading = false;

    answer$: Subject<CreateCompletionResponse> =
        new Subject<CreateCompletionResponse>();

    constructor(private readonly openaiService: CompletionService) {}

    submit() {
        if (!this.input.value) {
            return;
        }

        this.isLoading = true;
        this.openaiService
            .getResponse(this.input.value)
            .subscribe((value: CreateCompletionResponse) => {
                console.log('value');
                this.isLoading = false;
                this.answer$.next(value);
            });
    }

    getListFromText(text: string | undefined): string[] {
        if (!text) {
            return [];
        }

        return text
            .split('\n')
            .filter((value) => !(value === '' || value === ' '));
    }
}
