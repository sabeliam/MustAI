import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssistantComponent } from './assistant/assistant.component';

const routes: Routes = [
    {
        path: 'library',
        loadChildren: () =>
            import('./films/films.module').then((m) => m.FilmsModule),
    },
    {
        path: 'assistant',
        component: AssistantComponent,
    },
    { path: '', redirectTo: '/library/main', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
