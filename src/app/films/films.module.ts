import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsComponent } from './films.component';
import { SharedModule } from '../shared/shared.module';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
    declarations: [FilmsComponent],
    imports: [CommonModule, SharedModule, TuiButtonModule],
    exports: [FilmsComponent],
})
export class FilmsModule {}
