import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ENVIRONMENT} from '../../environment/environment';
import {Completion, Environment} from '@models';

@Injectable()
export class CompletionService implements Completion {
    private readonly apiUrl = `${this.env.apiUrl}/suggestions`;

    constructor(
        @Inject(ENVIRONMENT) private readonly env: Environment,
        private readonly httpClient: HttpClient
    ) {
    }

    public getResponse(prompt: string): Observable<{ text: string }> {
        return this.httpClient.post<{ text: string }>(
            `${this.apiUrl}/filmSuggestions`,
            {prompt},
        );
    }
}
