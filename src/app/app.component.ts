import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CompletionService } from '@core/services/completion/completion.service';
import { BehaviorSubject, from, map, Subject, switchMap } from 'rxjs';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title = 'MustAI';

    constructor(
        private readonly openaiService: CompletionService,
        private readonly tuiAlertService: TuiAlertService
    ) {}

    getMicrophone() {
        if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            this.tuiAlertService
                .open('access denied', { status: TuiNotification.Error })
                .subscribe();
        }

        from(navigator.mediaDevices.getUserMedia({ audio: true }))
            .pipe(
                map((stream) => {
                    stream.getTracks().forEach((track) => track.stop());
                }),
                switchMap(() =>
                    this.tuiAlertService.open('access granted', {
                        status: TuiNotification.Success,
                    })
                )
            )
            .subscribe(console.log);
    }
}
