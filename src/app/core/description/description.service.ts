import {Injectable} from '@angular/core';
import {catchError, map, Observable, of, throwError} from 'rxjs';
import {TmdbMovie, TmdbTv} from '@models/tmdb';
import {TmdbClient} from '@core/description/tmdb/tmdb-client.service';
import {TuiAlertService, TuiNotification} from '@taiga-ui/core';

@Injectable()
export class DescriptionService {
    constructor(
        private readonly tmdbCleint: TmdbClient,
        private readonly tuiAlertService: TuiAlertService
    ) {
    }

    public findFilmByImdbId(id: string): Observable<TmdbMovie | TmdbTv | null> {
        return this.tmdbCleint.findFilmByImdbId(id).pipe(
            map((value) => {
                if (value.movie_results.length) {
                    return value.movie_results[0] as TmdbMovie
                }

                if (value.tv_results.length) {
                    return value.tv_results[0] as TmdbTv
                }

                return null;
            }),
            catchError((err) => {
                console.error('error in find film', err);

                this.tuiAlertService
                    .open('Фильм не найден', {
                        status: TuiNotification.Error,
                    })
                    .subscribe();

                return throwError(() => new Error(err));
            })
        );
    }
}
