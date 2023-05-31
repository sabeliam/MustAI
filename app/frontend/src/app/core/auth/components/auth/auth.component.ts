import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserDTO} from '@core/auth/auth.model';
import {TuiAlertService, TuiNotification} from '@taiga-ui/core';
import {AuthService} from '@core/auth/services/auth.service';

export type ModelFormGroup<T> = FormGroup<{
    [K in keyof T]: FormControl<T[K]>;
}>;


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
    form = new FormGroup({
        username: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
        password: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]})
    })

    constructor(
        private authService: AuthService,
        private router: Router,
        private tuiAlertService: TuiAlertService
    ) {
    }

    register() {
        if (!this.form.valid) {
            return;
        }

        this.authService.register(this.form.value as UserDTO)
            .subscribe({
                next: value => {
                    this.tuiAlertService.open('Регистрация успешна').subscribe()
                    this.router.navigateByUrl('')
                },
                error: err => {
                    this.tuiAlertService.open('Username уже зарегистрирован', {
                        status: TuiNotification.Error
                    }).subscribe()

                    console.error(err)
                }
            })
    }

    login() {
        if (!this.form.valid) {
            return;
        }

        this.authService.login(this.form.value as UserDTO)
            .subscribe({
                next: value => {
                    this.tuiAlertService.open('Логин успешен').subscribe()
                    this.router.navigateByUrl('')
                },
                error: err => {
                    this.tuiAlertService.open('Ошибка логина', {
                        status: TuiNotification.Error
                    }).subscribe()

                    console.error(err)
                }
            })
    }
}
