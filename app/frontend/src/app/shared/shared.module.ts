import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { FilmDialogComponent } from './components/film-dialog/film-dialog.component';

@NgModule({
    declarations: [CardComponent, FilmDialogComponent],
    imports: [CommonModule, TuiIslandModule, TuiButtonModule],
    exports: [CardComponent],
})
export class SharedModule {}
