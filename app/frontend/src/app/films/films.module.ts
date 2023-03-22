import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsComponent } from './films.component';
import { SharedModule } from '@shared/shared.module';
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiFormatDatePipeModule,
    TuiHostedDropdownModule,
    TuiScrollbarModule,
    TuiSvgModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
    TuiDataListDropdownManagerModule,
    TuiDataListWrapperModule,
    TuiInputModule,
    TuiSelectModule,
    TuiTextAreaModule,
} from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { MainViewComponent } from './components/main-view/main-view.component';
import { TuiActiveZoneModule, TuiLetModule } from '@taiga-ui/cdk';
import { DetailedViewComponent } from './components/detailed-view/detailed-view.component';
import { FilmsRoutingModule } from './films-routing.module';

@NgModule({
    declarations: [FilmsComponent, MainViewComponent, DetailedViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        TuiButtonModule,
        TuiInputModule,
        ReactiveFormsModule,
        TuiSelectModule,
        TuiTextfieldControllerModule,
        TuiDataListWrapperModule,
        TuiDataListModule,
        TuiActiveZoneModule,
        TuiHostedDropdownModule,
        TuiDataListDropdownManagerModule,
        TuiLetModule,
        TuiSvgModule,
        FilmsRoutingModule,
        TuiTextAreaModule,
        TuiFormatDatePipeModule,
        TuiScrollbarModule,
    ],
    exports: [FilmsComponent],
})
export class FilmsModule {}
