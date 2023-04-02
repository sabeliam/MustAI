import {InjectionToken} from '@angular/core';
import {Environment} from '@models';

export const ENVIRONMENT = new InjectionToken<Environment>('environment', {
    factory: () => ({
        appVersion: '',
        openAiApiKey: '',
        openAiCompletionUrl: '',
        production: false,
        tmdbApiKey: '',
        apiUrl: ''
    }),
});
