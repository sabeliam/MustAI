import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
    TUI_SANITIZER,
    TuiAlertModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiLoaderModule,
    TuiRootModule,
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { inject, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TuiInputModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ENVIRONMENT } from '@core/environment/environment';
import { environment } from '../environments/environment';
import { CompletionService } from '@core/services/completion/completion.service';
import { AssistantModule } from './assistant/assistant.module';
import { FilmsModule } from './films/films.module';
import { NgxsModule } from '@ngxs/store';
import { FilmsState } from './films/films.state';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MockCompletionService } from '@core/services/completion/completion.mock.service';
import { DescriptionService } from '@core/tmdb/description/description.service';
import { TmdbModule } from '@core/tmdb/tmdb.module';

function completionFactory() {
    const env = inject(ENVIRONMENT);
    const httpClient = inject(HttpClient);

    return !env.production
        ? new MockCompletionService()
        : new CompletionService(env, httpClient);
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        TuiInputModule,
        ReactiveFormsModule,
        HttpClientModule,
        TuiButtonModule,
        TuiLoaderModule,
        TuiAlertModule,
        AssistantModule,
        FilmsModule,
        TmdbModule,
        NgxsModule.forRoot([FilmsState]),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),
    ],
    providers: [
        {
            provide: TUI_SANITIZER,
            useClass: NgDompurifySanitizer,
        },
        {
            provide: ENVIRONMENT,
            useValue: environment,
        },
        {
            provide: CompletionService,
            useFactory: completionFactory,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
