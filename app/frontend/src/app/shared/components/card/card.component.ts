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
export class CardComponent<T extends BaseItem> {
    @Input() item!: T;
    @Input() category: string | null = null;

    @Output() delete = new EventEmitter<T>();
    @Output() cardClick = new EventEmitter<T>();
}
