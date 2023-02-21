import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OpenaiService {
    constructor(private readonly httpClient: HttpClient) {
    }

    public getResponse(ask: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${environment.openAiKey}`
        });

        const body = {
            "model": "text-davinci-003",
            "prompt": ask,
            "temperature": 0.7,
            "max_tokens": 100,
        }

        return this.httpClient.post("https://api.openai.com/v1/completions", body, { headers })
    }
}
