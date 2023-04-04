import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TmdbClient} from '@core/description/tmdb/tmdb-client.service';
import {DescriptionService} from '@core/description/description.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        TmdbClient,
        DescriptionService,
    ],
})
export class TmdbModule {
}
