import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainViewComponent} from './pages/main-view/main-view.component';
import {DetailedViewComponent} from './pages/detailed-view/detailed-view.component';
import {FilmsComponent} from './films.component';
import {resolveFilm} from './services/films.resolver';

const routes: Routes = [
    {
        path: '',
        component: FilmsComponent,
        children: [
            {
                path: 'main',
                component: MainViewComponent,
                data: {animation: 'Home'},
            },
            {
                path: 'detailed/:id',
                component: DetailedViewComponent,
                data: {animation: 'Article'},
                resolve: {films: resolveFilm}
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
