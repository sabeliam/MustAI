import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsComponent } from './films/films.component';
import { AssistantComponent } from './assistant/assistant.component';

const routes: Routes = [
    {
        path: 'library',
        component: FilmsComponent,
    },
    {
        path: 'assistant',
        component: AssistantComponent,
    },
    { path: '', redirectTo: '/library', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
