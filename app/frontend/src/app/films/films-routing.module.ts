import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainViewComponent} from './pages/main-view/main-view.component';
import {DetailedViewComponent} from './pages/detailed-view/detailed-view.component';
import {FilmsComponent} from './films.component';
import {resolveFilms} from './services/films.resolver';

const routes: Routes = [
    {
        path: '',
        component: FilmsComponent,
        children: [
            {
                path: 'main',
                component: MainViewComponent,
                data: {animation: 'Home'},
                // resolve: {films: resolveFilms}
            },
            {
                path: 'detailed/:id',
                component: DetailedViewComponent,
                data: {animation: 'Article'},
            },
            {
                path: '',
                redirectTo: 'main',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FilmsRoutingModule {
}
