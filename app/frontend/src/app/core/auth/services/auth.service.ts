import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {ENVIRONMENT} from '@core/environment/environment';
import {Environment} from '@models';
import {ACCESS_TOKEN_NAME} from '@core/auth/constants/access_token';
import {ClearFilms, GetFilms} from '../../../films/store/films.actions';
import {UserDTO} from '@core/auth';
import {User} from '@models/user';
import {ClearUser, SelectUser} from '@core/user/store/user.actions';

export interface AuthDTO {
    user: User,
    access_token: string;
}

//TODO Переписать на NGXS
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // private currentUser$ = new BehaviorSubject<User | null>(null)
    private apiUrl = this.env.apiUrl;

    constructor(
        private readonly httpClient: HttpClient,
        private readonly router: Router,
        private readonly store: Store,
        @Inject(ENVIRONMENT) private readonly env: Environment,
    ) {
    }

    // get isAdmin$(): Observable<boolean> {
    //     return this.user$.pipe(map(user => user?.isAdmin ?? false))
    // }

    // get user$(): Observable<User | null> {
    //     if (this.currentUser$.value) {
    //         return this.currentUser$
    //     }
    //
    //     return this.httpClient.get<User>(`${this.apiUrl}/user`)
    //         .pipe(tap(user => this.currentUser$.next(user)))
    // }
    //
    // get currentUserUsername(): string {
    //     return this.currentUser$.value?.username ?? '';
    // }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem(ACCESS_TOKEN_NAME);

        return !!token;
    }

    public register(user: UserDTO): Observable<{ access_token: string }> {
        return this.httpClient.post<AuthDTO>(`${this.apiUrl}/auth/register`, user)
            .pipe(tap(value => {
                localStorage.setItem(ACCESS_TOKEN_NAME, value.access_token);
                this.store.dispatch(new SelectUser(user));
                this.store.dispatch(new GetFilms());
            }));
    }

    public login(user: UserDTO): Observable<{ access_token: string }> {
        return this.httpClient.post<AuthDTO>(`${this.apiUrl}/auth/login`, user)
            .pipe(tap(value => {
                this.store.dispatch(new SelectUser(user));
                localStorage.setItem(ACCESS_TOKEN_NAME, value.access_token);
                this.store.dispatch(new GetFilms());
            }));
    }

    public logout(): Observable<any> {
        return this.httpClient.post<AuthDTO>(`${this.apiUrl}/auth/logout`, {})
            .pipe(tap(value => {
                this.store.dispatch(new ClearUser());
                localStorage.removeItem(ACCESS_TOKEN_NAME);
                this.store.dispatch(new ClearFilms())
                this.router.navigateByUrl('auth');
            }));
    }
}
