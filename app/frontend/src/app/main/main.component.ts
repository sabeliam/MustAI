import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthService} from '@core/auth';
import {Select, Store} from '@ngxs/store';
import {UserState} from '@core/user/store/user.state';
import {Observable} from 'rxjs';
import {User} from '@models/user';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
    @Select(UserState.currentUser) public user$: Observable<User>;

    opened = false;

    constructor(
        private readonly store: Store,
        private readonly authService: AuthService
    ) {
    }

    logout() {
        this.authService.logout().subscribe()
    }

}
