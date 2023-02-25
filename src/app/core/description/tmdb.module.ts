import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbClient } from '@core/description/tmdb/tmdb-client.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@core/description/auth-interceptor';
import { CacheInterceptor } from '@core/description/cache-interceptor';
import { DescriptionService } from '@core/description/description.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        TmdbClient,
        DescriptionService,
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: AuthInterceptor,
        //     multi: true,
        // },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: CacheInterceptor,
        //     multi: true,
        // },
    ],
})
export class TmdbModule {}
