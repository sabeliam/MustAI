import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './components/card/card.component';
import {TuiIslandModule} from '@taiga-ui/kit';
import {TuiButtonModule} from '@taiga-ui/core';
import {FilmDialogComponent} from './components/film-dialog/film-dialog.component';
import {InfiniteScrollDirective} from '@shared/directives/infinite-scroll.directive';
import {ImageFallbackDirective} from '@shared/directives/image-fallback.directive';

@NgModule({
    declarations: [CardComponent, FilmDialogComponent, InfiniteScrollDirective, ImageFallbackDirective],
    imports: [CommonModule, TuiIslandModule, TuiButtonModule],
    exports: [CardComponent, InfiniteScrollDirective, ImageFallbackDirective],
})
export class SharedModule {
}
