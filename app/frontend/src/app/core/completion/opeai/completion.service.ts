import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../environment/environment';
import { CreateCompletionRequest, CreateCompletionResponse } from 'openai';
import { Completion, Environment } from '@models';

enum Model {
    Сurie = 'text-curie-001',
    Davinci = 'text-davinci-003',
    Ada = 'text-ada-001',
    Babbage = 'text-babbage-001',
}

@Injectable()
export class CompletionService implements Completion {
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.env.openAiApiKey}`,
    });

    constructor(
        @Inject(ENVIRONMENT) private readonly env: Environment,
        private readonly httpClient: HttpClient
    ) {}

    public getResponse(ask: string): Observable<CreateCompletionResponse> {
        const prompt = `Give me list of films with tags: ${ask}, add to list their imdb id`;
        // const prompt = `Give me list of films with tags: ${ask}`;

        const body: CreateCompletionRequest = {
            model: Model.Davinci,
            prompt,
            temperature: 0.7,
            max_tokens: 1000,
        };

        return this.httpClient.post<CreateCompletionResponse>(
            this.env.openAiCompletionUrl,
            body,
            {
                headers: this.headers,
            }
        );
    }
}
