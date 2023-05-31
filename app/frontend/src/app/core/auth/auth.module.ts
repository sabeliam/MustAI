import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiButtonModule, TuiErrorModule, TuiHintModule} from '@taiga-ui/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule} from '@taiga-ui/kit';
import {AuthInterceptor, AuthComponent} from '@core/auth';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        TuiButtonModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiHintModule,
        TuiInputPasswordModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: AuthInterceptor
        }
    ]
})
export class AuthModule {
}
