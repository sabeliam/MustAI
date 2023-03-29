import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilmsComponent} from './films.component';
import {SharedModule} from '@shared/shared.module';
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiFormatDatePipeModule,
    TuiHostedDropdownModule, TuiPrimitiveTextfieldModule,
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
import {ReactiveFormsModule} from '@angular/forms';
import {MainViewComponent} from './pages/main-view/main-view.component';
import {TuiActiveZoneModule, TuiAutoFocusModule, TuiLetModule} from '@taiga-ui/cdk';
import {DetailedViewComponent} from './pages/detailed-view/detailed-view.component';
import {FilmsRoutingModule} from './films-routing.module';
import {SearchComponent} from './search/search.component';
import {SearchItemComponent} from './search/search-item/search-item.component';
import {NgxsModule} from '@ngxs/store';
import {FilmsState} from './store/films.state';

@NgModule({
    declarations: [FilmsComponent, MainViewComponent, DetailedViewComponent, SearchComponent, SearchItemComponent],
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
        TuiPrimitiveTextfieldModule,
        TuiAutoFocusModule,
        NgxsModule.forRoot([FilmsState]),
    ],
    exports: [FilmsComponent],
})
export class FilmsModule {
}
