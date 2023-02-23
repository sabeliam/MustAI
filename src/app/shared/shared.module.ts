import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
    declarations: [CardComponent],
    imports: [CommonModule, TuiIslandModule, TuiButtonModule],
    exports: [CardComponent],
})
export class SharedModule {}
