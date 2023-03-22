import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiLinkModule } from '@taiga-ui/core';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { HeaderComponent } from './header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        PolymorpheusModule,
        TuiButtonModule,
        TuiSidebarModule,
        TuiActiveZoneModule,
        TuiLinkModule,
        RouterLinkActive,
        RouterLink,
    ],
    declarations: [HeaderComponent, NavigationComponent],
    exports: [HeaderComponent],
})
export class TuiDocHeaderModule {}
