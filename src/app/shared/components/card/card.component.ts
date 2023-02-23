import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { BaseItem } from '@models/base-item';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
    @Input() item!: BaseItem;
    @Input() category: string | null = null;

    @Output() delete = new EventEmitter<string>();
    @Output() cardClick = new EventEmitter<string>();
}
