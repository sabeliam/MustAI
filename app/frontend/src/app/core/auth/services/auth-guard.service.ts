import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from './auth.service';
import {Store} from '@ngxs/store';
import {GetUser} from '@core/user/store/user.actions';
import {Observable, of} from 'rxjs';
import {mapTo} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
    constructor(private store: Store, public auth: AuthService, public router: Router) {
    }

    canActivate(): Observable<any> {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['auth']);
            return of(false);
        }

        if (this.store.selectSnapshot(state => state.user.currentUser) === null) {
            return this.store.dispatch(new GetUser()).pipe(mapTo(true));
        }

        return of(true);
    }
}
