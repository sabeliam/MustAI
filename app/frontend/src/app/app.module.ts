import {NgDompurifySanitizer} from '@tinkoff/ng-dompurify';
import {
    TUI_SANITIZER,
    TuiAlertModule,
    TuiButtonModule,
    TuiDialogModule, TuiHostedDropdownModule,
    TuiLoaderModule,
    TuiRootModule, TuiSvgModule,
} from '@taiga-ui/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {inject, isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TuiInputModule} from '@taiga-ui/kit';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ENVIRONMENT} from '@core/environment/environment';
import {environment} from '../environments/environment';
import {CompletionService} from '@core/completion/opeai/completion.service';
import {AssistantModule} from './assistant/assistant.module';
import {FilmsModule} from './films/films.module';
import {NgxsModule} from '@ngxs/store';
import {FilmsState} from './films/store/films.state';
import {ServiceWorkerModule} from '@angular/service-worker';
import {MockCompletionService} from '@core/completion/opeai/completion.mock.service';
import {TmdbClient} from '@core/description/tmdb/tmdb-client.service';
import {TmdbModule} from '@core/description/tmdb.module';
import {CompletionModule} from '@core/completion/completion.module';
import {NAVIGATION_ITEMS} from './header/navigation/navigation.providers';
import {TuiDocHeaderModule} from './header/header.module';
import {TuiActiveZoneModule, TuiSwipeService} from '@taiga-ui/cdk';
import {TuiSheetModule} from '@taiga-ui/addon-mobile';
import {AuthModule} from '@core/auth/auth.module';
import {MainModule} from './main/main.module';
import {UserState} from '@core/user/store/user.state';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiActiveZoneModule,
        TuiSheetModule,
        TuiAlertModule,
        TuiInputModule,
        ReactiveFormsModule,
        HttpClientModule,
        TuiButtonModule,
        TuiLoaderModule,
        AuthModule,
        TuiAlertModule,
        AssistantModule,
        MainModule,
        FilmsModule,
        TmdbModule,
        CompletionModule,
        NgxsModule.forRoot([UserState]),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),
        TuiDocHeaderModule,
        TuiHostedDropdownModule,
        TuiSvgModule,
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
            provide: NAVIGATION_ITEMS,
            useValue: [
                {
                    title: 'Ассистент',
                    route: 'assistant',
                },
                {
                    title: 'Библиотека',
                    route: 'library',
                },
            ],
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
