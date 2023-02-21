import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {OpenaiService} from './core/services/openai.service';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    title = 'MustAI';
    input = new FormControl<string>('');
    isLoading = false;

    answer$ = new BehaviorSubject<any[]>([]);

    constructor(private readonly openaiService: OpenaiService) {
    }

    submit() {
        if (!this.input.value) {
            return;
        }

        this.isLoading = true
        this.openaiService
            .getResponse(this.input.value)
            .subscribe(value => {
                this.isLoading = false;
                this.answer$.next(value.choices)
            });
    }
}
