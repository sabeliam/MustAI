import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistantComponent } from './assistant.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [AssistantComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiLoaderModule,
        TuiButtonModule,
        SharedModule,
    ],
    exports: [AssistantComponent],
})
export class AssistantModule {}
