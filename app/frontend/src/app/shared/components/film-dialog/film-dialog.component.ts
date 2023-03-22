import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiSheet } from '@taiga-ui/addon-mobile';
import { Film } from '@models';

@Component({
    selector: 'app-film-dialog',
    templateUrl: './film-dialog.component.html',
    styleUrls: ['./film-dialog.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmDialogComponent {
    constructor(
        @Inject(POLYMORPHEUS_CONTEXT)
        private readonly context: TuiSheet<any, Film>
    ) {}

    get film(): Film {
        return this.context.data;
    }
}
