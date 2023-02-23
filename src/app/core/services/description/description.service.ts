import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../environment/environment';
import { Environment } from '@models';

@Injectable()
export class DescriptionService {
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.env.tmdbApiKey}`,
    });

    constructor(
        @Inject(ENVIRONMENT) private readonly env: Environment,
        private readonly httpClient: HttpClient
    ) {}

    public getDescription(id: string): Observable<any> {
        return this.httpClient.get(`https://api.themoviedb.org/3/movie/${id}`, {
            headers: this.headers,
        });
    }
}
