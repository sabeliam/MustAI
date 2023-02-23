import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistantComponent } from './assistant.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core';

@NgModule({
    declarations: [AssistantComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiLoaderModule,
        TuiButtonModule,
    ],
    exports: [AssistantComponent],
})
export class AssistantModule {}
