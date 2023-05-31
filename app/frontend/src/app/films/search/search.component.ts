import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {of, Subject, switchMap, takeUntil, throttleTime} from 'rxjs';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {DescriptionService} from '@core/description/description.service';
import {SearchResult} from '@models/tmdb';
import {Store} from '@ngxs/store';
import {Film} from '@models';
import {fromSearchResultToFilm} from '@shared/utils/filmDTO';
import {AddFilm} from '../store/films.actions';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {FilmDialogComponent} from '@shared/components/film-dialog/film-dialog.component';
import {TuiDialogService} from '@taiga-ui/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TuiDestroyService]
})
export class SearchComponent implements OnInit {
    open = false;
    search = new FormControl<string>('', {nonNullable: true});

    searchResults$ = new Subject<SearchResult[]>()

    constructor(
        private readonly descriptionService: DescriptionService,
        private readonly tuiDialogService: TuiDialogService,
        private readonly injector: Injector,
        private readonly destroy$: TuiDestroyService,
        private readonly store: Store,
        private cdr: ChangeDetectorRef,
    ) {
    }

    ngOnInit() {
        this.subscribeToSearchFilms()
    }

    subscribeToSearchFilms() {
        this.search.valueChanges
            .pipe(
                throttleTime(200),
                distinctUntilChanged(),
                takeUntil(this.destroy$),
                switchMap(value => {
                    if (value.length > 3) {
                        this.open = true;
                        return this.descriptionService.findFilmByName(value)
                    }

                    this.open = false;
                    return of({results: []})
                })
            )
            .subscribe(value => {
                this.searchResults$.next(value.results)
            })
    }

    addFilm(result: SearchResult) {
        const film: Film = fromSearchResultToFilm(result);

        this.store.dispatch(new AddFilm(film))
    }

    onSearchChange(search: string): void {
        this.search.setValue(search);
    }


    openDialog(searchResult: SearchResult) {
        this.addFilm(searchResult);
        // this.open = false;
        // this.cdr.markForCheck();
        // return this.tuiDialogService.open(
        //     new PolymorpheusComponent(
        //         FilmDialogComponent,
        //         this.injector
        //     ),
        //     {
        //         data: fromSearchResultToFilm(searchResult) as any,
        //         closeable: true,
        //     }
        // ).subscribe()
    }
}
