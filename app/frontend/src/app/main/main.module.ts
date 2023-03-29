import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {TuiDataListModule, TuiHostedDropdownModule, TuiSvgModule} from '@taiga-ui/core';
import {TuiDocHeaderModule} from '../header/header.module';
import {RouterOutlet} from '@angular/router';


@NgModule({
    declarations: [MainComponent],
    imports: [
        CommonModule,
        TuiDataListModule,
        TuiHostedDropdownModule,
        TuiDocHeaderModule,
        RouterOutlet,
        TuiSvgModule
    ]
})
export class MainModule {
}
