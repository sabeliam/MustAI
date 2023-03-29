import {ChangeDetectionStrategy, Component, HostBinding, Inject} from '@angular/core';
import {NAVIGATION_ITEMS, Page} from './navigation.providers';
import {ENVIRONMENT} from '@core/environment/environment';
import {Environment} from '@models';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
    @HostBinding(`class._open`)
    menuOpen = false;

    appVersion = this.env.appVersion;

    constructor(
        @Inject(NAVIGATION_ITEMS) readonly items: readonly Page[],
        @Inject(ENVIRONMENT) private readonly env: Environment
    ) {
    }

    closeMenu(): void {
        this.menuOpen = false;
    }
}
