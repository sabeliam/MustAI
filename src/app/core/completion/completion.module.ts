import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletionService } from '@core/completion/opeai/completion.service';
import { ENVIRONMENT } from '@core/environment/environment';
import { HttpClient } from '@angular/common/http';
import { MockCompletionService } from '@core/completion/opeai/completion.mock.service';

function completionFactory() {
    const env = inject(ENVIRONMENT);
    const httpClient = inject(HttpClient);

    // return new CompletionService(env, httpClient);

    return !env.production
        ? new MockCompletionService()
        : new CompletionService(env, httpClient);
}

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        {
            provide: CompletionService,
            useFactory: completionFactory,
        },
    ],
})
export class CompletionModule {}
