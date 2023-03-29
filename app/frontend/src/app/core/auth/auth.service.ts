import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserDTO} from '@core/auth/auth.model';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {ClearStore, GetFilms} from '../../films/store/films.actions';

export interface User {
    username: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUser$ = new BehaviorSubject<User | null>(null)

    private backend = 'http://localhost:3000';

    constructor(
        private readonly httpClient: HttpClient,
        private readonly router: Router,
        private readonly store: Store
    ) {
    }

    get user$(): Observable<User | null> {
        if (this.currentUser$.value) {
            return this.currentUser$
        }

        return this.httpClient.get<User>(`${this.backend}/user`)
            .pipe(tap(user => this.currentUser$.next(user)))
    }

    get currentUserUsername(): string {
        return this.currentUser$.value?.username ?? '';
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('access_token');

        return !!token;
    }

    public register(user: UserDTO): Observable<{ access_token: string }> {
        return this.httpClient.post<{ access_token: string }>(`${this.backend}/auth/register`, user)
            .pipe(tap(value => {
                localStorage.setItem('access_token', value.access_token);
                this.currentUser$.next({username: user.username})
                this.store.dispatch(new GetFilms());
            }));
    }

    public login(user: UserDTO): Observable<{ access_token: string }> {
        return this.httpClient.post<{ access_token: string }>(`${this.backend}/auth/login`, user)
            .pipe(tap(value => {
                this.currentUser$.next({username: user.username})
                localStorage.setItem('access_token', value.access_token);
                this.store.dispatch(new GetFilms());
            }));
    }

    public logout(): Observable<any> {
        return this.httpClient.post<{ access_token: string }>(`${this.backend}/auth/logout`, {})
            .pipe(tap(value => {
                this.currentUser$.next(null)
                localStorage.removeItem('access_token');
                this.store.dispatch(new ClearStore())
                this.router.navigateByUrl('auth')
            }));
    }
}
