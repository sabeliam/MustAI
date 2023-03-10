import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CompletionService } from '@core/completion/opeai/completion.service';
import { BehaviorSubject, from, map, Subject, switchMap } from 'rxjs';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { TuiSwipeService } from '@taiga-ui/cdk';
import { ENVIRONMENT } from '@core/environment/environment';
import { Environment } from '@models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TuiSwipeService],
})
export class AppComponent {
    title = 'MustAI';
    appVersion = this.env.appVersion;

    constructor(
        private readonly openaiService: CompletionService,
        private readonly tuiAlertService: TuiAlertService,
        @Inject(ENVIRONMENT) private readonly env: Environment
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
