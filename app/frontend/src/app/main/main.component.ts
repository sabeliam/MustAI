import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthService} from '@core/auth/auth.service';
import {TuiDialogService} from '@taiga-ui/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
    user$ = this.authService.user$;

    opened = false;

    constructor(
        private readonly authService: AuthService
    ) {
    }

    logout() {
        this.authService.logout().subscribe()
    }

}
