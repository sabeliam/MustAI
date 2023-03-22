import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistantComponent } from './assistant.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';
import {
    TuiButtonModule,
    TuiLoaderModule,
    TuiScrollbarModule,
} from '@taiga-ui/core';
import { SharedModule } from '@shared/shared.module';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { AssistantAnswerComponent } from './assistant-answer/assistant-answer.component';

@NgModule({
    declarations: [AssistantComponent, AssistantAnswerComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiLoaderModule,
        TuiButtonModule,
        SharedModule,
        TuiSidebarModule,
        TuiActiveZoneModule,
        TuiScrollbarModule,
    ],
    exports: [AssistantComponent],
})
export class AssistantModule {}
