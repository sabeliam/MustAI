import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AssistantComponent} from './assistant/assistant.component';
import {AuthComponent, AuthGuardService} from '@core/auth';
import {MainComponent} from './main/main.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'library',
                loadChildren: () =>
                    import('./films/films.module').then((m) => m.FilmsModule),
            },
            {
                path: 'assistant',
                component: AssistantComponent,
            },
            {
                path: '',
                redirectTo: '/library/main',
                pathMatch: 'full'
            },
        ],
        canActivate: [AuthGuardService]
    },
    {
        path: 'auth',
        component: AuthComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
