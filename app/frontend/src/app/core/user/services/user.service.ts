import {Inject, Injectable} from '@angular/core';
import {User} from '@models/user';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ENVIRONMENT} from '@core/environment/environment';
import {Environment} from '@models';

@Injectable({providedIn: 'root'})
export class UserService {
    private apiUrl = this.env.apiUrl;

    constructor(
        private readonly httpClient: HttpClient,
        @Inject(ENVIRONMENT) private readonly env: Environment
    ) {
    }

    public getUser(): Observable<User> {
        return this.httpClient.get<User>(`${this.apiUrl}/user`)
    }
}
