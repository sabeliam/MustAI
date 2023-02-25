import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsComponent } from './films.component';
import { SharedModule } from '../shared/shared.module';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [FilmsComponent],
    imports: [
        CommonModule,
        SharedModule,
        TuiButtonModule,
        TuiInputModule,
        ReactiveFormsModule,
    ],
    exports: [FilmsComponent],
})
export class FilmsModule {}
