import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionService } from '@core/tmdb/description/description.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@core/tmdb/auth-interceptor';
import { CacheInterceptor } from '@core/tmdb/cache-interceptor';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        DescriptionService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CacheInterceptor,
            multi: true,
        },
    ],
})
export class TmdbModule {}
