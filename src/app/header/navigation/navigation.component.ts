import {ChangeDetectionStrategy, Component, HostBinding, Inject} from '@angular/core';
import {NAVIGATION_ITEMS, Page} from './navigation.providers';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
    @HostBinding(`class._open`)
    menuOpen = false;

    constructor(@Inject(NAVIGATION_ITEMS) readonly items: readonly Page[]) {
    }

    closeMenu(): void {
        this.menuOpen = false;
    }
}
