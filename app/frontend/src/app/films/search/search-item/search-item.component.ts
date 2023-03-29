import {ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import {SearchResult} from '@models/tmdb';
import {fromSearchResultToFilm, getImgUrl} from '@shared/utils/filmDTO';
import {tuiPure} from '@taiga-ui/cdk';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {FilmDialogComponent} from '@shared/components/film-dialog/film-dialog.component';

@Component({
    selector: 'app-search-item',
    templateUrl: './search-item.component.html',
    styleUrls: ['./search-item.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchItemComponent {
    @Input() searchResult!: SearchResult

    @Output() clickAdd = new EventEmitter()

    @tuiPure
    getImg(posterPath: string | null): string | null {
        return getImgUrl(posterPath)
    }


    onAddClick(event: Event) {
        event.stopPropagation();
        this.clickAdd.emit();
    }
}
